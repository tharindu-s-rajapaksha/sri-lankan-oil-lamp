// Lamp branch positions configuration
// Each position represents a branch where lamps can be placed
// Coordinates are in percentages for responsiveness
// left: horizontal position (0-100%)
// top: vertical position (0-100%)
// spread: how much randomness to add around this position

export const branchPositions = [
  // Top left branches
{ left: "26.6%", top: "13.6%", spread: 1, label: "New Branch" },
{ left: "21.7%", top: "24.3%", spread: 1, label: "New Branch" },
{ left: "28.1%", top: "28.2%", spread: 1, label: "New Branch" },
{ left: "32.4%", top: "21.7%", spread: 1, label: "New Branch" },
{ left: "35.1%", top: "32.9%", spread: 1, label: "New Branch" },
{ left: "23.7%", top: "35.0%", spread: 1, label: "New Branch" },
{ left: "18.5%", top: "32.6%", spread: 1, label: "New Branch" },
{ left: "39.6%", top: "18.0%", spread: 1, label: "New Branch" },
{ left: "46.6%", top: "11.5%", spread: 1, label: "New Branch" },
{ left: "47.3%", top: "28.3%", spread: 1, label: "New Branch" },
{ left: "51.5%", top: "12.6%", spread: 1, label: "New Branch" },
{ left: "58.0%", top: "15.6%", spread: 1, label: "New Branch" },
{ left: "66.2%", top: "24.6%", spread: 1, label: "New Branch" },
{ left: "57.9%", top: "25.3%", spread: 1, label: "New Branch" },
{ left: "29.9%", top: "51.7%", spread: 1, label: "New Branch" },
{ left: "38.2%", top: "53.6%", spread: 1, label: "New Branch" },
{ left: "44.6%", top: "37.6%", spread: 1, label: "New Branch" },
{ left: "78.8%", top: "62.5%", spread: 1, label: "New Branch" },
{ left: "71.5%", top: "66.2%", spread: 1, label: "New Branch" },
{ left: "65.5%", top: "63.5%", spread: 1, label: "New Branch" },
{ left: "48.3%", top: "63.2%", spread: 1, label: "New Branch" },
{ left: "52.4%", top: "34.6%", spread: 1, label: "New Branch" },
{ left: "38.2%", top: "32.5%", spread: 1, label: "New Branch" },
{ left: "61.6%", top: "67.3%", spread: 1, label: "New Branch" },
{ left: "23.6%", top: "11.0%", spread: 1, label: "New Branch" },
{ left: "42.6%", top: "48.3%", spread: 1, label: "New Branch" },
];

// Lamp size configuration (responsive)
export const lampSizes = {
  desktop: {
    base: 70,      // Base size in pixels (reduced from 100)
    minScale: 0.6,  // Minimum scale multiplier
    maxScale: 0.9,  // Maximum scale multiplier
  },
  tablet: {
    base: 60,
    minScale: 0.5,
    maxScale: 0.8,
  },
  mobile: {
    base: 50,
    minScale: 0.4,
    maxScale: 0.7,
  }
};

// Get responsive lamp size based on screen width
export const getResponsiveLampSize = () => {
  const width = window.innerWidth;
  
  if (width >= 1024) {
    return lampSizes.desktop;
  } else if (width >= 768) {
    return lampSizes.tablet;
  } else {
    return lampSizes.mobile;
  }
};
