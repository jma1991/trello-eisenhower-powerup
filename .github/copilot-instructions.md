# Copilot Instructions — Eisenhower Matrix Trello Power-Up

## Architecture

This is a **Trello Power-Up** (client-side only, no backend) hosted on GitHub Pages. It uses the [Trello Power-Up SDK](https://developer.atlassian.com/cloud/trello/power-ups/) loaded from `https://p.trellocdn.com/power-up.min.js`.

There are **two parallel implementations** — be aware which one you're editing:

| Entry point | Capabilities | Status |
|---|---|---|
| `index.html` | `card-buttons`, `card-badges`, `card-detail-badges` | **Active** — registered as the iframe connector URL |
| `js/client.js` + `card-back.html` + `css/style.css` | `card-back-section`, `card-badges`, `card-detail-badges` | **Legacy** — uses a different capability set |

The active Power-Up connector is `index.html`. It registers capabilities inline via `TrelloPowerUp.initialize()` and opens `popup.html` for user input.

## Key Concepts

- **Data storage**: Card data is stored via `t.set('card', 'shared', 'eisenhowerMatrix', { importance, urgency })` and read with `t.get('card', 'shared', 'eisenhowerMatrix')`. The `'shared'` scope makes data visible to all board members.
- **Quadrant logic**: `getQuadrant(importance, urgency)` maps high/low values to four quadrants (Do It, Schedule It, Delegate It, Don't Do It). This function is **duplicated** in `index.html`, `popup.html`, `card-back.html`, and `js/client.js` — keep all copies in sync.
- **Badge colors**: Must use Trello's named colors (`green`, `blue`, `yellow`, `red`) — not hex values — in badge definitions returned to the SDK.
- **Popup sizing**: `popup.html` uses `t.sizeTo('#eisenhower-form')` and is opened with `height: 184`. Adjust both if the form layout changes.

## Trello Power-Up Capabilities

The three registered capabilities in `index.html`:
- `card-buttons` — adds the "Importance / Urgency" button that opens `popup.html` as a popup
- `card-badges` — renders a colored quadrant badge on card fronts
- `card-detail-badges` — renders Importance, Urgency, and Quadrant badges on card backs (each badge with a callback to re-open the popup)

## Development Workflow

```bash
# Serve locally with HTTPS (Trello requires HTTPS for iframes)
npx serve

# Then register a Power-Up at https://trello.com/power-ups/admin
# pointing to your local URL (e.g. https://localhost:3000/)
```

No build step, bundler, or package manager — files are served as-is. GitHub Pages deployment is manual: go to repo Settings → Pages and select `main` as the deployment branch. Test changes by reloading the Trello board (Power-Up iframes cache aggressively; use hard refresh).

## Conventions

- **Vanilla JS only** — no frameworks, no modules, no transpilation. All JS is inline `<script>` tags (except the legacy `js/client.js`).
- **`var` in active code, `const` in legacy** — `index.html` and `popup.html` use `var`; `js/client.js` and `card-back.html` use `const`. Match the style of the file you're editing.
- **Trello CSS** — `popup.html` loads `https://p.trellocdn.com/power-up.min.css` for native Trello styling. Use class `mod-primary` for submit buttons.
- **Quadrant color mapping**: green=Do It, blue=Schedule It, yellow=Delegate It, red=Don't Do It. This mapping is a core domain rule.
