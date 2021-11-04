import React from 'react'

import '../Styling/HealthRiskCard.css'

export const HealthRiskCard = ({ occupation, risk }) => {
    return (
        <div className="riskContainer">
            <h3>{occupation}</h3>
            <p>{risk}</p>
        </div>
    )
}

