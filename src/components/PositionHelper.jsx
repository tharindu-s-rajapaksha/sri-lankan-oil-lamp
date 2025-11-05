import { useState, useEffect } from 'react'
import './PositionHelper.css'

const PositionHelper = ({ onPositionClick }) => {
  const [showGrid, setShowGrid] = useState(true)
  const [clickPosition, setClickPosition] = useState(null)

  const handleClick = (e) => {
    // Get the lamp-container element for accurate positioning
    const lampContainer = document.querySelector('.lamp-container')
    if (!lampContainer) return
    
    const rect = lampContainer.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Only register clicks within the container
    if (x < 0 || x > 100 || y < 0 || y > 100) return
    
    const position = {
      left: `${x.toFixed(1)}%`,
      top: `${y.toFixed(1)}%`
    }
    
    setClickPosition(position)
    
    // Copy to clipboard
    const code = `{ left: "${x.toFixed(1)}%", top: "${y.toFixed(1)}%", spread: 3, label: "New Branch" },`
    navigator.clipboard.writeText(code).then(() => {
      console.log('Position copied to clipboard!')
    })
    
    if (onPositionClick) {
      onPositionClick(position)
    }
  }

  useEffect(() => {
    // Add click listener to the entire window to catch clicks
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="position-helper-overlay">
      <div className="position-helper-controls">
        <button onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? '📍 Hide Grid' : '📍 Show Grid'}
        </button>
        <div className="position-helper-info">
          <strong>🎯 Position Helper</strong>
          <p>Click on the tree area to get coordinates</p>
          {clickPosition && (
            <div className="clicked-position">
              <div>Left: {clickPosition.left}</div>
              <div>Top: {clickPosition.top}</div>
              <div className="copy-hint">✅ Copied to clipboard!</div>
            </div>
          )}
        </div>
      </div>
      
      {showGrid && (
        <div className="position-grid-container">
          {/* Vertical lines */}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(x => (
            <div
              key={`v-${x}`}
              className="grid-line vertical"
              style={{ left: `${x}%` }}
            >
              <span className="grid-label">{x}%</span>
            </div>
          ))}
          
          {/* Horizontal lines */}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(y => (
            <div
              key={`h-${y}`}
              className="grid-line horizontal"
              style={{ top: `${y}%` }}
            >
              <span className="grid-label">{y}%</span>
            </div>
          ))}
          
          {/* Click indicator */}
          {clickPosition && (
            <div
              className="click-marker"
              style={{
                left: clickPosition.left,
                top: clickPosition.top
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default PositionHelper
