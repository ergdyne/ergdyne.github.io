import React from 'react'
import { Citizen, Position, SCORES } from '../mockAPI/citizen'
import { District } from '../mockAPI/district'
import CitizenCard from './CitizenCard'

interface Props {
  citizens: Citizen[]
  updateCitizen?: (c: Citizen) => void
  district?: District
  disabled?: boolean
}


// Add district title prop with calculation for team score +10 for preferred +5 for generalist
// Training +2 / week, -1/week, range 0 - (5 or 10 (if advanced facility))

export default function DistrictCitizens(props: Props) {
  const { district, citizens, updateCitizen, disabled } = props
  const teamTotal = citizens.map(citizen => {
    let value = 0
    if (citizen.assignedPosition) {
      value += citizen.basketBallAptitude
      if (citizen.assignedPosition === citizen.preferredPosition) value += SCORES.matchesPosition
      if (citizen.preferredPosition === Position.Generalist) value += SCORES.matchesPosition
      if (citizen.trainingValue) value += citizen.trainingValue
    }
    return value
  }).reduce((t, c) => t + c)
  return (
    <div>
      <br/>
      {
        (district) ?
        <h4>{`District ${district.name} | Last Round Score: ${teamTotal}`}</h4> :
        <div/>
      }
      {citizens.map((citizen, i) => <CitizenCard
          key={i}
          citizen={citizen}
          update={updateCitizen}
          disabled={disabled || !updateCitizen}
        />
      )}
    </div>
  )
}
