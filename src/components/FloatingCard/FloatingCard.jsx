import { forwardRef } from 'react'
import './FloatingCard.css'

const FloatingCard = forwardRef((props, ref) => {
    return (
        <div className="floating-card" ref={ref}>
            <div className="floating-card-inner">
                <div className="hero-card-placeholder">
                    <div className="hero-card-placeholder-icon">🧑‍🎨</div>
                    <div className="hero-card-placeholder-text">DESIGNER</div>
                </div>
                <div className="hero-card-tag">Digital Designer</div>
            </div>
        </div>
    )
})

export default FloatingCard
