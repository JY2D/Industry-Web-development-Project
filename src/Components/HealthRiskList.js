import React from 'react'
import { HealthRiskCard } from './HealthRiskCard'

import "../Styling/HealthRiskList.css"

export default function HealthRiskList({occupation, risks}) {
    return (
        <div>
            <h1> Health Risks </h1>
            {
                risks.map(risk => {
                    return <HealthRiskCard occupation={occupation} risk={risk}/>
                })
            }
        </div>
    )
}

