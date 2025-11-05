# 🪔 Lamp Position Configuration Guide

## Quick Start

All lamp positions are configured in: `src/config/lampPositions.js`

## How to Adjust Lamp Positions

### 1. Understanding the Coordinate System

```javascript
{
  left: 50,      // Horizontal position (0-100%)
                 // 0 = far left, 50 = center, 100 = far right
  
  top: 30,       // Vertical position (0-100%)
                 // 0 = top, 50 = middle, 100 = bottom
  
  spread: 3,     // Random offset range (in percentage)
                 // Adds natural variation around the position
  
  label: "Center 1"  // Description for easy identification
}
```

### 2. Finding the Right Position for Your Tree

**To place a lamp on a specific branch:**

1. Open `src/config/lampPositions.js`
2. Find an existing position or add a new one:

```javascript
export const branchPositions = [
  // Example: Add a new lamp position
  { left: 45, top: 35, spread: 4, label: "My Custom Branch" },
  
  // Existing positions...
  { left: 15, top: 28, spread: 4, label: "Left 1" },
  // ...
];
```

### 3. Visual Reference Guide

```
Screen Layout (percentage positions):

Top (top: 0-20%)
├─ Left     (left: 0-30%)
├─ Center   (left: 40-60%)
└─ Right    (left: 70-100%)

Middle (top: 30-60%)
├─ Left     (left: 0-30%)
├─ Center   (left: 40-60%)
└─ Right    (left: 70-100%)

Bottom (top: 70-100%)
└─ Usually for trunk/base
```

### 4. Testing Your Changes

1. Save `lampPositions.js`
2. Refresh your browser
3. Start a new ceremony to see updated positions
4. Adjust values and repeat until perfect!

### 5. Tips for Perfect Positioning

**Match Your Tree Image:**
- Look at your tree.png branches
- Use browser dev tools to measure positions
- Start with `spread: 2-3` for precise placement
- Increase `spread` to 5-8 for more natural variation

**For Better Results:**
- Add more positions where tree has many branches
- Use smaller `spread` values near the trunk (center)
- Use larger `spread` values on outer branches

**Common Adjustments:**

```javascript
// Too high? Increase top value
{ left: 45, top: 35, spread: 3 }  // Original
{ left: 45, top: 45, spread: 3 }  // Move down

// Too far right? Decrease left value
{ left: 80, top: 35, spread: 3 }  // Original
{ left: 70, top: 35, spread: 3 }  // Move left

// Too spread out? Decrease spread value
{ left: 45, top: 35, spread: 8 }  // Original
{ left: 45, top: 35, spread: 3 }  // More precise
```

## Responsive Sizing

Lamp sizes automatically adjust for different screen sizes in `lampPositions.js`:

```javascript
export const lampSizes = {
  desktop: {
    base: 100,      // Lamp size in pixels
    minScale: 0.7,  // Smallest lamp scale
    maxScale: 1.1,  // Largest lamp scale
  },
  tablet: {
    base: 80,       // Smaller on tablets
    minScale: 0.6,
    maxScale: 1.0,
  },
  mobile: {
    base: 60,       // Smallest on phones
    minScale: 0.5,
    maxScale: 0.9,
  }
};
```

**To adjust lamp sizes:**
- Change `base` for overall size
- Adjust `minScale` and `maxScale` for size variation

## Example: Adding a New Branch Position

```javascript
// In lampPositions.js, add to the branchPositions array:

{ 
  left: 55,           // Slightly right of center
  top: 42,            // Middle height
  spread: 4,          // Moderate variation
  label: "New Branch" // Your description
},
```

## Quick Position Reference Table

| Area | left | top | Use For |
|------|------|-----|---------|
| Top Left | 10-25 | 15-25 | Upper left branches |
| Top Center | 40-60 | 15-25 | Top center branches |
| Top Right | 75-90 | 15-25 | Upper right branches |
| Mid Left | 15-30 | 30-60 | Left side branches |
| Mid Center | 45-55 | 30-60 | Main trunk area |
| Mid Right | 70-85 | 30-60 | Right side branches |
| Lower | 20-80 | 60-75 | Lower branches only |

## Need Help?

1. Start with small changes (±5 on left/top values)
2. Test with fewer lamps first (5-8 lamps)
3. Use the label field to identify positions easily
4. Save often and test in browser

Happy decorating! ✨🪔
