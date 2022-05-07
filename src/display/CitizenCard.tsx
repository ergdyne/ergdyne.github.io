import React, { useCallback } from 'react'
import {
  Citizen,
  Position,
  Assignment,
  MAX_BASKETBALL_APTITUDE,
  POSITION_OPTIONS,
  ASSIGNMENT_OPTIONS,
} from '../mockAPI/citizen'
import RadioField from './RadioField'

interface Props {
  citizen: Citizen
  disabled: boolean
  update?: (c: Citizen) => void
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
  const { citizen, update, disabled } = props

  const updatePosition = useCallback((position: string | number) => {
    citizen.assignedPosition = position as Position
    citizen.assignment = Assignment.Training
    if(update) update(citizen)
  }, [update, citizen])

  const updateWorkAssignment = useCallback((assignment: string | number) => {
    citizen.assignment = assignment as Assignment
    if(update) update(citizen)
  }, [update, citizen])

  return (<div>
    <h5>{citizen.name}</h5>
    <RadioField
      options={ASSIGNMENT_OPTIONS}
      onChange={updateWorkAssignment}
      disabled={disabled}
      inline={true}
      value={citizen.assignment}
    />
    <RadioField
      options={POSITION_OPTIONS}
      onChange={updatePosition}
      disabled={disabled}
      inline={true}
      value={citizen.assignedPosition}
    />
    <p> {aboutCitizen(citizen)} </p>
  </div>)
}