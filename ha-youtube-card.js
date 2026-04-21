/**
 * ha-youtube-card.js
 *
 * A Lovelace card that embeds YouTube videos, playlists, and live streams.
 * Uses the YouTube IFrame Player API for playback control.
 *
 * Phase 1: Playback only (no auth required).
 * Phase 2 will add a companion integration for OAuth + Data API.
 */

import { LitElement, html, css } from 'lit';
import './ha-youtube-card-editor.js';

// ---------------------------------------------------------------------------
// YouTube IFrame API loader
//
// The YT API script is loaded once, lazily, when the first card mounts.
// All card instances wait on the same promise — no duplicate script tags.
// ---------------------------------------------------------------------------
let _ytApiPromise = null;

function loadYouTubeAPI() {
  if (_ytApiPromise) return _ytApiPromise;

  _ytApiPromise = new Promise((resolve) => {
    // If the API is already on the page (e.g. page reload), resolve immediately
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // YouTube calls this global function when the API script finishes loading
    window.onYouTubeIframeAPIReady = resolve;

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    // Add after existing scripts to avoid blocking HA's own scripts
    document.head.appendChild(script);
  });

  return _ytApiPromise;
}

// ---------------------------------------------------------------------------
// SVG icons
//
// Inline SVGs keep the bundle self-contained with no icon library dependency.
// Using Material Design paths (same icons HA uses) for visual consistency.
// ---------------------------------------------------------------------------
const ICONS = {
  play: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  pause: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  volumeUp: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
  volumeMute: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
  fullscreen: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
  fullscreenExit: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`,
};

// ---------------------------------------------------------------------------
// HaYoutubeCard
// ---------------------------------------------------------------------------
class HaYoutubeCard extends LitElement {

  // Properties that LitElement watches — any change triggers a re-render
  static get properties() {
    return {
      hass: { type: Object },       // Injected by HA — gives access to states, services, etc.
      config: { type: Object },     // The card's YAML/editor config
      _playerReady: { state: true },  // True once the YT player is initialised
      _playing: { state: true },      // True when video is actively playing
      _muted: { state: true },        // True when muted
      _volume: { state: true },       // 0–100
      _fullscreen: { state: true },   // True when in fullscreen
    };
  }

  constructor() {
    super();
    this._playerReady = false;
    this._playing = false;
    this._muted = false;
    this._volume = 100;
    this._fullscreen = false;
    this._player = null;
    // Unique ID so multiple cards on the same dashboard don't conflict
    this._containerId = 'yt-player-' + Math.random().toString(36).slice(2, 7);
  }

  // ---------------------------------------------------------------------------
  // HA card interface — these three methods are the contract HA expects
  // ---------------------------------------------------------------------------

  // Called when the card config is set or updated
  setConfig(config) {
    if (!config.content_id) {
      throw new Error('ha-youtube-card: please set a content_id');
    }
    this.config = {
      content_type: 'video',   // default
      autoplay: false,
      mute_on_start: false,
      ...config,
    };
  }

  // Returns the editor element (defined in ha-youtube-card-editor.js)
  static getConfigElement() {
    return document.createElement('ha-youtube-card-editor');
  }

  // Default config shown when user picks "YouTube Player" from the card picker
  static getStubConfig() {
    return {
      content_id: 'dQw4w9WgXcQ',
      content_type: 'video',
      autoplay: false,
    };
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  // Called once after the first render — safe to query the shadow DOM here
  firstUpdated() {
    this._setupFullscreenListener();
    this._initPlayer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up the player when the card is removed from the dashboard
    if (this._player) {
      this._player.destroy();
      this._player = null;
    }
  }

  // ---------------------------------------------------------------------------
  // Player initialisation
  // ---------------------------------------------------------------------------

  async _initPlayer() {
    // Wait for the YouTube IFrame API to be ready
    await loadYouTubeAPI();

    const container = this.shadowRoot.getElementById(this._containerId);
    if (!container) return;

    const { content_id, content_type, autoplay, mute_on_start } = this.config;

    // playerVars control YouTube's built-in UI behaviours
    const playerVars = {
      autoplay: autoplay ? 1 : 0,
      controls: 0,          // Hide YT controls — we use our own
      rel: 0,               // Don't show unrelated videos at the end
      modestbranding: 1,    // Smaller YouTube logo
      playsinline: 1,       // Critical for iOS and tablet WebViews
      fs: 0,                // Disable YT's own fullscreen button (we handle it)
      mute: mute_on_start ? 1 : 0,
    };

    // Playlists need their own playerVars
    if (content_type === 'playlist') {
      playerVars.listType = 'playlist';
      playerVars.list = content_id;
    }

    // Live channels use a special list type
    if (content_type === 'channel') {
      playerVars.listType = 'user_uploads';
      playerVars.list = content_id;
    }

    this._player = new YT.Player(container, {
      // For playlists/channels the videoId is empty — the list playerVars handle it
      videoId: content_type === 'video' ? content_id : '',
      playerVars,
      events: {
        onReady: (e) => this._onPlayerReady(e),
        onStateChange: (e) => this._onStateChange(e),
        onError: (e) => this._onError(e),
      },
    });
  }

  _onPlayerReady(event) {
    this._playerReady = true;
    this._muted = this._player.isMuted();
    this._volume = this._player.getVolume();
  }

  _onStateChange(event) {
    // YT.PlayerState values: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
    this._playing = event.data === YT.PlayerState.PLAYING;
  }

  _onError(event) {
    // Error codes: 2 invalid ID, 5 HTML5 error, 100 not found, 101/150 embedding disabled
    console.warn('ha-youtube-card: YouTube player error', event.data);
  }

  // ---------------------------------------------------------------------------
  // Playback controls
  // ---------------------------------------------------------------------------

  _togglePlay() {
    if (!this._player) return;
    this._playing ? this._player.pauseVideo() : this._player.playVideo();
  }

  _toggleMute() {
    if (!this._player) return;
    if (this._muted) {
      this._player.unMute();
      this._muted = false;
    } else {
      this._player.mute();
      this._muted = true;
    }
  }

  _onVolumeChange(e) {
    const vol = parseInt(e.target.value, 10);
    this._volume = vol;
    if (this._player) {
      this._player.setVolume(vol);
      // If user drags volume up from 0, auto-unmute
      if (vol > 0 && this._muted) {
        this._player.unMute();
        this._muted = false;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Fullscreen
  //
  // We fullscreen the ha-card element (the whole card including controls),
  // not just the iframe — this way controls remain visible and usable.
  // ---------------------------------------------------------------------------

  _toggleFullscreen() {
    const card = this.shadowRoot.querySelector('ha-card');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      // Enter fullscreen — try standard then webkit prefix for older tablets
      if (card.requestFullscreen) card.requestFullscreen();
      else if (card.webkitRequestFullscreen) card.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }

  _setupFullscreenListener() {
    // Update our _fullscreen state when the browser enters/exits fullscreen
    // (this also catches the user pressing Escape to exit)
    const handler = () => {
      this._fullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
  }

  // ---------------------------------------------------------------------------
  // Styles
  //
  // Using HA CSS variables wherever possible so the card respects the
  // user's chosen theme automatically.
  // ---------------------------------------------------------------------------

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-background-color, #1c1c1c);
      }

      /* Wrapper maintains 16:9 aspect ratio at any width */
      .video-wrapper {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        background: #000;
      }

      /* The IFrame API replaces the container div with an iframe */
      .video-wrapper > div,
      .video-wrapper iframe {
        position: absolute;
        inset: 0;        /* shorthand for top/right/bottom/left: 0 */
        width: 100%;
        height: 100%;
        border: none;
      }

      /* Loading state shown before the player is ready */
      .loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.5);
        font-size: 13px;
        pointer-events: none;
      }

      /* Controls bar */
      .controls {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        gap: 4px;
        background: var(--card-background-color, #1c1c1c);
        min-height: 44px;  /* 44px is the minimum comfortable touch target height */
      }

      /* Icon buttons */
      .ctrl-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: var(--primary-text-color, #fff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;   /* 40px minimum touch target width */
        min-height: 40px;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }

      .ctrl-btn:hover {
        background: var(--secondary-background-color, rgba(255,255,255,0.1));
      }

      .ctrl-btn svg {
        width: 20px;
        height: 20px;
        pointer-events: none;
      }

      /* Volume slider — flex-grows to fill available space */
      .volume-slider {
        flex: 1;
        min-width: 40px;
        accent-color: var(--primary-color, #03a9f4);
        cursor: pointer;
      }

      /* Push fullscreen button to the right */
      .fullscreen-btn {
        margin-left: auto;
      }

      /* In fullscreen: stretch the card to fill the screen */
      :host-context(:fullscreen) ha-card,
      :host-context(:-webkit-full-screen) ha-card {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      :host-context(:fullscreen) .video-wrapper,
      :host-context(:-webkit-full-screen) .video-wrapper {
        flex: 1;
        padding-top: 0;
      }
    `;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    return html`
      <ha-card>
        <div class="video-wrapper">
          <div id="${this._containerId}"></div>
          ${!this._playerReady ? html`<div class="loading">Loading player…</div>` : ''}
        </div>

        <div class="controls">

          <!-- Play / Pause -->
          <button class="ctrl-btn"
            @click="${this._togglePlay}"
            title="${this._playing ? 'Pause' : 'Play'}"
            ?disabled="${!this._playerReady}">
            ${this._playing ? ICONS.pause : ICONS.play}
          </button>

          <!-- Mute -->
          <button class="ctrl-btn"
            @click="${this._toggleMute}"
            title="${this._muted ? 'Unmute' : 'Mute'}"
            ?disabled="${!this._playerReady}">
            ${this._muted ? ICONS.volumeMute : ICONS.volumeUp}
          </button>

          <!-- Volume slider -->
          <input class="volume-slider" type="range"
            min="0" max="100"
            .value="${this._volume}"
            @input="${this._onVolumeChange}"
            title="Volume"
            ?disabled="${!this._playerReady}" />

          <!-- Fullscreen -->
          <button class="ctrl-btn fullscreen-btn"
            @click="${this._toggleFullscreen}"
            title="${this._fullscreen ? 'Exit fullscreen' : 'Fullscreen'}">
            ${this._fullscreen ? ICONS.fullscreenExit : ICONS.fullscreen}
          </button>

        </div>
      </ha-card>
    `;
  }
}

customElements.define('ha-youtube-card', HaYoutubeCard);

// Tell HA's card picker about this card
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-youtube-card',
  name: 'YouTube Player',
  description: 'Plays YouTube videos, playlists and live streams',
  preview: true,
  documentationURL: 'https://github.com/YOUR_USERNAME/ha-youtube-card',
});
