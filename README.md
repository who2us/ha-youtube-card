# ha-youtube-card

A Lovelace card for Home Assistant that embeds YouTube videos, playlists, and live streams with native playback controls.

Built with [LitElement](https://lit.dev/) — lightweight, no heavy framework, compatible with older Android tablets.

## Installation via HACS

1. Open HACS in your Home Assistant sidebar
2. Go to **Frontend**
3. Click the **+** button and search for *YouTube Player Card*
4. Install and reload your browser

## Manual installation

1. Copy `ha-youtube-card.js` to your `config/www/` folder
2. Add a resource in **Settings → Dashboards → Resources**:
   - URL: `/local/ha-youtube-card.js`
   - Type: JavaScript module
3. Reload your browser

## Configuration

Add via the visual card editor, or manually in YAML:

```yaml
type: custom:ha-youtube-card
content_id: dQw4w9WgXcQ   # Video ID, playlist ID, or channel username
content_type: video        # video | playlist | channel
autoplay: false
mute_on_start: false
```

### Finding IDs

| Content | Where to find the ID |
|---|---|
| Video | The part after `?v=` in the URL |
| Playlist | The part after `?list=` in the URL |
| Channel | The channel username (e.g. `LinusTechTips`) |

## Roadmap

- **Phase 2** — OAuth sign-in, like/dislike, private playlists (requires companion integration)
- **Phase 3** — Tablet UI polish, mini player, HA `media_player` entity

## Development

```bash
npm install
npm run dev      # watch mode — rebuilds on file save
npm run build    # production build
```

To release: push a tag (`git tag v1.0.0 && git push origin v1.0.0`). GitHub Actions builds and publishes automatically.
