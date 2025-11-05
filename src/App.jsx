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
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [lampSize, setLampSize] = useState(getResponsiveLampSize())
  const [backgroundMusic, setBackgroundMusic] = useState(null)

  // Initialize background music
  useEffect(() => {
    const music = new Audio('/music.mp3')
    music.loop = true
    music.volume = 0.3
    setBackgroundMusic(music)
    
    return () => {
      if (music) {
        music.pause()
        music.currentTime = 0
      }
    }
  }, [])

  // Handle window resize for responsive lamp sizes
  useEffect(() => {
    const handleResize = () => {
      setLampSize(getResponsiveLampSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Control background music based on sound enabled state
  useEffect(() => {
    if (backgroundMusic) {
      if (soundEnabled && lampCount !== null) {
        backgroundMusic.play().catch(() => {})
      } else {
        backgroundMusic.pause()
      }
    }
  }, [soundEnabled, backgroundMusic, lampCount])

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
      const audio = new Audio('/flame.mp3')
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
    <div className="app" data-lit-count={litCount}>
      {/* Decorative Background */}
      <div className="background">
        <div className="bodhi-tree"></div>
        <div className="stars"></div>
        {/* Dynamic background glow based on lit lamps */}
        <div className="ambient-glow" style={{
          opacity: lampCount !== null ? litCount / lampCount : 0
        }}></div>
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
            {/* Lamp Counter - Commented out as requested */}
            {/* <div className="lamp-counter">
              <span className="lit-count">{litCount}</span>
              <span className="separator">/</span>
              <span className="total-count">{lampCount}</span>
              <span className="label">lamps lit</span>
            </div> */}
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
