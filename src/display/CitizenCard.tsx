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
import citizencard from "./citizencard.module.css"
import { Button, OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap'

interface Props {
  citizen: Citizen
  disabled: boolean
  update?: (c: Citizen) => void
}

function displayPreferred(position: Position): string {
  return (position == Position.Generalist) ? 'any position' : position
}

function aboutCitizen(citizen: Citizen): string {
  let result = ``
  
  if (citizen.assignedPosition) {
    result = result + `They are playing ${citizen.assignedPosition}, `
    if ((
      citizen.assignedPosition == citizen.preferredPosition ||
      citizen.preferredPosition == Position.Generalist) &&
      citizen.basketBallAptitude > 0.5 * MAX_BASKETBALL_APTITUDE
    ) {
      result = result + 'and '
    } else {
      result = result + 'but '
    }
    if (citizen.basketBallAptitude > 0.5 * MAX_BASKETBALL_APTITUDE) {
      result = result + `they prefer playing ${citizen.preferredPosition}`
    } else {
      result = result + `they would rather not.`
    }
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

  const citizenBlurb = (p: TooltipProps) => (
    <Tooltip {...p}> {aboutCitizen(citizen)} </Tooltip>
  )

  return (
    <div className={citizencard.citizen}>
      <OverlayTrigger
        placement='right'
        delay={{ show: 250, hide: 400 }}
        overlay={citizenBlurb}
      >
        <div className={citizencard.section} >
          <Button className={citizencard.name} variant='dark' > {citizen.name} </Button>
          <Button className={citizencard.score} variant='dark' >
            {citizen.basketBallAptitude}
          </Button>
        </div>
      </OverlayTrigger>
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
        preferedValue={citizen.preferredPosition}
      />
    </div>
  )
}
