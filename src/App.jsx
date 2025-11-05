import { useState, useEffect } from 'react'
import OilLamp from './components/OilLamp'
import PositionHelper from './components/PositionHelper'
import { branchPositions, getResponsiveLampSize } from './config/lampPositions'
import './App.css'

// Set to true to enable position helper mode
const DEV_MODE = false

function App() {
  const [lampCount, setLampCount] = useState(null)
  const [lamps, setLamps] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [lampSize, setLampSize] = useState(getResponsiveLampSize())

  // Handle window resize for responsive lamp sizes
  useEffect(() => {
    const handleResize = () => {
      setLampSize(getResponsiveLampSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleStartCeremony = (count) => {
    const newLamps = Array.from({ length: count }, (_, i) => {
      // Select a branch position (cycle through if more lamps than branches)
      const branch = branchPositions[i % branchPositions.length]
      
      // Parse percentage values (remove % and convert to number)
      const leftValue = parseFloat(branch.left)
      const topValue = parseFloat(branch.top)
      
      // Add some randomness around the branch position
      const randomOffsetX = (Math.random() - 2) * branch.spread
      const randomOffsetY = (Math.random() - 2) * (branch.spread * 2)
      
      // Random scale based on responsive settings
      const randomScale = lampSize.minScale + Math.random() * (lampSize.maxScale - lampSize.minScale)
      
      return {
        id: i,
        isLit: false,
        position: {
          left: `${leftValue + randomOffsetX}%`,
          top: `${topValue + randomOffsetY}%`,
        },
        rotation: Math.random() * 20 - 10, // Random rotation between -10 and 10 degrees
        scale: randomScale,
      }
    })
    
    setLamps(newLamps)
    setLampCount(count)
  }

  const handleLampClick = (id) => {
    setLamps(prevLamps =>
      prevLamps.map(lamp =>
        lamp.id === id ? { ...lamp, isLit: !lamp.isLit } : lamp
      )
    )
    
    // Play lighting sound if enabled
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6f')
      audio.volume = 0.3
      audio.play().catch(() => {})
    }
  }

  const handleReset = () => {
    setLampCount(null)
    setLamps([])
  }

  const litCount = lamps.filter(lamp => lamp.isLit).length

  return (
    <div className="app">
      {/* Decorative Background */}
      <div className="background">
        <div className="bodhi-tree"></div>
        <div className="stars"></div>
      </div>

      {/* Position Helper - Only in Dev Mode */}
      {DEV_MODE && lampCount !== null && <PositionHelper />}

      {/* Ambient Audio Toggle */}
      {lampCount !== null && (
        <button 
          className="sound-toggle"
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      )}

      {lampCount === null ? (
        // Selection Screen
        <div className="selection-screen">
          {/* <h1 className="title">
            <span className="om-symbol">ॐ</span>
            දීපාවලිය
          </h1>
          <h2 className="subtitle">Sri Lankan Oil Lamp Ceremony</h2> */}
          <p className="description">
            Light the sacred oil lamps (Pahana) to bring peace, prosperity, and spiritual enlightenment
          </p>
          
          <div className="lamp-selector">
            <label htmlFor="lamp-count">How many lamps would you like to light?</label>
            <div className="selector-controls">
              <input
                type="range"
                id="lamp-count"
                min="1"
                max="25"
                defaultValue="25"
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  document.getElementById('count-display').textContent = value
                }}
              />
              <span id="count-display" className="count-display">25</span>
            </div>
            <button
              className="start-button"
              onClick={() => {
                const count = parseInt(document.getElementById('lamp-count').value)
                handleStartCeremony(count)
              }}
            >
              Light Lamps
            </button>
          </div>

          <div className="decorative-lamp">
            <OilLamp isLit={true} size={120} />
          </div>
        </div>
      ) : (
        // Lamp Lighting Screen
        <div className="ceremony-screen">
          <div className="header">
            <button className="reset-button" onClick={handleReset}>
              ←
            </button>
            <div className="lamp-counter">
              <span className="lit-count">{litCount}</span>
              <span className="separator">/</span>
              <span className="total-count">{lampCount}</span>
              <span className="label">lamps lit</span>
            </div>
          </div>

          {/* Lamp Container - matches tree dimensions */}
          <div className="lamp-container">
            {lamps.map(lamp => (
              <OilLamp
                key={lamp.id}
                isLit={lamp.isLit}
                onClick={() => handleLampClick(lamp.id)}
                size={lampSize.base}
                style={{
                  position: 'absolute',
                  left: lamp.position.left,
                  top: lamp.position.top,
                  transform: `rotate(${lamp.rotation}deg) scale(${lamp.scale})`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
