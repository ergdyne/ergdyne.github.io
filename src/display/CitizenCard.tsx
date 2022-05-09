import React, { useCallback, useState } from 'react'
import {
  Citizen,
  Position,
  Assignment,
  MAX_BASKETBALL_APTITUDE,
  POSITION_OPTIONS,
  ASSIGNMENT_OPTIONS,
} from '../mockAPI/citizen'
import RadioField from './RadioField'
import { Button, OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap'
import MoveModal from './MoveModal'
import { District } from '../mockAPI/district'
import citizencard from "./citizencard.module.css"

interface Props {
  citizen: Citizen
  disabled: boolean
  move: (newDistrict: number | null) => void
  districtNames: Map<String, number>
  district?: District
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
  const { citizen, update, disabled, move, districtNames, district } = props
  const [showMoveModal, setShowMoveModal] = useState(false)
  const openMoveModal = useCallback(
    () => { setShowMoveModal(true) }, [showMoveModal, setShowMoveModal]
  )
  const closeMoveModal = useCallback(
    () => { setShowMoveModal(false) }, [showMoveModal, setShowMoveModal]
  )

  const updatePosition = useCallback((position: string | number) => {
    citizen.assignedPosition = position as Position
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
      <div className={citizencard.section} >
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={citizenBlurb}
        >
          <Button className={citizencard.name} variant='dark' > {citizen.name} </Button>
        </OverlayTrigger>
        <Button className={citizencard.score} variant='dark' >
          {citizen.basketBallAptitude}
        </Button>
        <Button onClick={openMoveModal} className={citizencard.item} variant='warning' >
          {`Move`}
        </Button>
      </div>
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
      <MoveModal
        show={showMoveModal}
        citizen={citizen}
        excludeDismiss={!update}
        districtNames={districtNames}
        move={move}
        handleClose={closeMoveModal}
        currentDistrict={(district) ? district.name : undefined}
      />
    </div>
  )
}
