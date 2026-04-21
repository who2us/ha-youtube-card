/**
 * ha-youtube-card-editor.js
 *
 * The visual configuration editor shown when a user clicks the pencil icon
 * on the card in their dashboard. HA auto-loads this via getConfigElement().
 *
 * We use HA's own UI elements (ha-textfield, ha-select, ha-switch) so the
 * editor looks and feels native — no extra styling needed.
 */

import { LitElement, html, css } from 'lit';

class HaYoutubeCardEditor extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      _config: { state: true },
    };
  }

  // HA calls setConfig when the editor opens, passing the current card config
  setConfig(config) {
    this._config = { ...config };
  }

  // Fired whenever any field changes — dispatches the new config up to HA
  _valueChanged(e) {
    if (!this._config) return;

    const target = e.target;
    const key = target.dataset.key;

    // Checkboxes use .checked; everything else uses .value
    const value = target.checked !== undefined ? target.checked : target.value;

    // Don't fire if nothing actually changed
    if (this._config[key] === value) return;

    this._config = { ...this._config, [key]: value };

    // This event tells HA to update the card config in the dashboard YAML
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="card-config">

        <!-- Content ID field -->
        <ha-textfield
          label="Content ID"
          .value="${this._config.content_id || ''}"
          data-key="content_id"
          @change="${this._valueChanged}"
          helper="Paste a YouTube video ID, playlist ID, or channel username"
          helper-persistent
        ></ha-textfield>

        <!-- Content type dropdown -->
        <ha-select
          label="Content type"
          .value="${this._config.content_type || 'video'}"
          data-key="content_type"
          @selected="${this._valueChanged}"
          @closed="${e => e.stopPropagation()}"
        >
          <mwc-list-item value="video">Single video</mwc-list-item>
          <mwc-list-item value="playlist">Playlist</mwc-list-item>
          <mwc-list-item value="channel">Channel uploads</mwc-list-item>
        </ha-select>

        <!-- Toggle row: Autoplay -->
        <div class="toggle-row">
          <span class="toggle-label">
            <span>Autoplay on load</span>
            <span class="toggle-hint">Note: browsers require mute for autoplay to work</span>
          </span>
          <ha-switch
            .checked="${this._config.autoplay || false}"
            data-key="autoplay"
            @change="${this._valueChanged}"
          ></ha-switch>
        </div>

        <!-- Toggle row: Mute on start -->
        <div class="toggle-row">
          <span class="toggle-label">
            <span>Start muted</span>
            <span class="toggle-hint">Useful for background displays</span>
          </span>
          <ha-switch
            .checked="${this._config.mute_on_start || false}"
            data-key="mute_on_start"
            @change="${this._valueChanged}"
          ></ha-switch>
        </div>

      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0 8px;
      }

      ha-textfield,
      ha-select {
        width: 100%;
      }

      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px;
      }

      .toggle-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .toggle-label span:first-child {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .toggle-hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `;
  }
}

customElements.define('ha-youtube-card-editor', HaYoutubeCardEditor);
