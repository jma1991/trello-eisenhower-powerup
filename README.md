# Eisenhower Matrix Power-Up for Trello

A Trello Power-Up that helps you prioritize cards using the Eisenhower Matrix framework.

## What is the Eisenhower Matrix?

The Eisenhower Matrix is a decision-making tool that helps prioritize tasks based on their importance and urgency. Tasks are categorized into four quadrants:

|                  | Urgent                          | Not Urgent                        |
| ---------------- | ------------------------------- | --------------------------------- |
| **Important**    | 🟢 Do It – Act on immediately   | 🔵 Schedule It – Plan for later   |
| **Not Important**| 🟡 Delegate It – Hand off       | 🔴 Don't Do It – Eliminate        |

Learn more: [Eisenhower Matrix on Untools](https://untools.co/eisenhower-matrix/)

## Features

- **Card Button** – Set Important (Yes/No) and Urgent (Yes/No) for any card
- **Quadrant Preview** – See the resulting quadrant before saving
- **Card Badges** – Color-coded quadrant displayed on card front
- **Detail Badges** – Important, Urgent, and Quadrant shown on card back

## Installation

### For Personal Use

1. Go to [Trello Power-Ups Admin](https://trello.com/power-ups/admin)
2. Click **New**
3. Fill in:
   - **Name:** Eisenhower Matrix
   - **Iframe connector URL:** `https://jma1991.github.io/trello-eisenhower-powerup/`
4. Click **Create**
5. Go to the **Capabilities** tab and enable:
   - `card-buttons`
   - `card-badges`
   - `card-detail-badges`
6. Add the Power-Up to your board via the Power-Ups menu

### For Development

```bash
git clone https://github.com/jma1991/trello-eisenhower-powerup.git
cd trello-eisenhower-powerup

# Serve locally with HTTPS (required by Trello)
npx serve
```

Then register a Power-Up with your local URL (e.g. `https://localhost:3000/`).

## Usage

1. Open any card on your board
2. Click the **Eisenhower Matrix** button in the Power-Ups section
3. Select **Important** (Yes or No)
4. Select **Urgent** (Yes or No)
5. Click **Save**

The card will display a colored badge indicating its quadrant:

- 🟢 Green = Do It
- 🔵 Blue = Schedule It
- 🟡 Yellow = Delegate It
- 🔴 Red = Don't Do It

## Project Structure

```
├── index.html      # Power-Up connector (capabilities registration)
├── popup.html      # Input form for setting Importance/Urgency
├── icon.svg        # Power-Up icon (2x2 matrix)
├── manifest.json   # Power-Up metadata
├── css/
│   └── style.css   # Styles (legacy)
├── js/
│   └── client.js   # JavaScript (legacy)
└── card-back.html  # Card back section (legacy)
```

## License

MIT
