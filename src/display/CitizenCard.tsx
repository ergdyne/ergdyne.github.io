import React, { useCallback } from 'react'
import {
  Citizen,
  Position,
  MAX_BASKETBALL_APTITUDE,
  POSITION_OPTIONS,
} from '../mockAPI/citizen'
import RadioField from './RadioField'

interface Props {
  citizen: Citizen
  update: (c: Citizen) => void
}

function displayPreferred(position: Position): string {
  return (position == Position.Generalist) ? 'any position' : position
}

function aboutCitizen(citizen: Citizen): string {
  let result = `Basketball aptitude of ${citizen.basketBallAptitude}. `
  
  if (citizen.assignedPosition) {
    result = result + `They are playing ${citizen.assignedPosition}, `
    if (
      citizen.assignedPosition == citizen.preferredPosition ||
      citizen.preferredPosition == Position.Generalist
    ) {
      result = result + 'and '
    } else {
      result = result + 'but '
    }
    result = result + `they prefer playing ${citizen.preferredPosition}`
  } else {
    result = result + `They are currently working in ${citizen.assignment}. `
    if (citizen.basketBallAptitude > 0.5 * MAX_BASKETBALL_APTITUDE) {
      result = result +
        `They would prefer to be playing ${displayPreferred(citizen.preferredPosition)}.`
    } else {
      result = result +
        `They could play ${displayPreferred(citizen.preferredPosition)}, but would rather not.`
    }
  }
  return result
}

export default function CitizenCard(props: Props) {
  const { citizen, update } = props

  const updatePosition = useCallback((position: string | number) => {
    citizen.assignedPosition = position as Position
    console.log(`Changed to ${position}`)
    console.log(citizen)
    update(citizen)
  }, [update, citizen])

  return (<div>
    <h5>{`${citizen.name} - ${citizen.assignment}`}</h5>
    <p> {aboutCitizen(citizen)} </p>
    <RadioField
      options={POSITION_OPTIONS}
      onChange={updatePosition}
      disabled={false}
      inline={true}
      value={citizen.assignedPosition}
    />
  </div>)
}
