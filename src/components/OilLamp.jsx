import './OilLamp.css'

const OilLamp = ({ isLit = false, onClick, style, size = 100 }) => {
  return (
    <div 
      className={`oil-lamp-container ${isLit ? 'lit' : ''}`}
      onClick={onClick}
      style={style}
    >
      {/* Glow effect when lit */}
      {isLit && (
        <>
          <div className="glow-outer"></div>
          <div className="glow-inner"></div>
        </>
      )}

      {/* Flame */}
      {isLit && (
        <div className="flame-container">
          <div className="flame">
            <div className="flame-core"></div>
            <div className="flame-outer"></div>
          </div>
          <div className="flame-sparkles">
            <span className="sparkle sparkle-1"></span>
            <span className="sparkle sparkle-2"></span>
            <span className="sparkle sparkle-3"></span>
          </div>
        </div>
      )}

      {/* Oil Lamp Image */}
      <img 
        src="/lamp.png" 
        alt="Oil Lamp" 
        className={`lamp-image ${isLit ? 'lit' : ''}`}
        style={{ width: `${size}px`, height: 'auto' }}
      />

      {/* Click indicator when not lit */}
      {!isLit && (
        <div className="click-hint">
          <span></span>
        </div>
      )}
    </div>
  )
}

export default OilLamp
