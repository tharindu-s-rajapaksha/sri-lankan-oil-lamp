# 🎯 Real-Time Position Helper Guide

## Quick Start

The position helper is now enabled! Here's how to use it:

## How It Works

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Begin a ceremony** (select any number of lamps and click "Begin Ceremony")

3. **You'll see:**
   - A grid overlay with percentage lines
   - A control panel in the top-left corner
   - Percentage markers (0%, 10%, 20%, etc.)

## Finding Perfect Positions

### Step 1: Click on Tree Branches
- Click anywhere on the screen where you want a lamp
- A golden marker appears at the click position
- The coordinates are **automatically copied to clipboard**

### Step 2: See the Exact Position
The control panel shows:
```
Left: 45.3%
Top: 32.7%
✅ Copied to clipboard!
```

### Step 3: Paste into lampPositions.js
Open `src/config/lampPositions.js` and paste:
```javascript
{ left: "45.3%", top: "32.7%", spread: 3, label: "New Branch" },
```

### Step 4: Save and Reload
- Save the file
- Browser automatically refreshes (Vite hot reload)
- Start a new ceremony to see your changes!

## Tips

**Toggle Grid On/Off:**
- Click "📍 Hide Grid" to remove the grid lines
- Click "📍 Show Grid" to bring them back

**Accurate Positioning:**
- Use the grid lines as guides
- 50% = center of screen
- 0% = top/left edge
- 100% = bottom/right edge

**Multiple Positions:**
- Click multiple spots to find all your branch positions
- Each click copies the code to clipboard
- Paste each one into lampPositions.js

## Turn Off Dev Mode (When Done)

In `src/App.jsx`, change:
```javascript
const DEV_MODE = true  // ← Change this to false
```

## Example Workflow

1. Start ceremony with tree visible
2. Click on a tree branch → Position copied!
3. Open `lampPositions.js`
4. Paste the new position:
   ```javascript
   { left: "52.3%", top: "15.8%", spread: 3, label: "Top Branch" },
   ```
5. Save file → Browser auto-refreshes
6. Start new ceremony → See lamp on that branch!
7. Repeat for all branches

## Visual Guide

```
   0%                    50%                   100%
   ├──────────────────────┼──────────────────────┤
0% │                      |                      │
   │                      |                      │
   │         🌲 TREE      |                      │
50%├──────────────────────┼──────────────────────┤
   │                      |                      │
   │                      |                      │
100%└──────────────────────┴──────────────────────┘

Click anywhere → Get exact % coordinates!
```

Happy positioning! ✨
