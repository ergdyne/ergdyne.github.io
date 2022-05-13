import React, { useCallback, useMemo } from 'react'
import { Citizen, Position, SCORES } from '../mockAPI/citizen'
import { District } from '../mockAPI/district'
import CheckBox from './CheckBox'
import CitizenCard from './CitizenCard'

interface Props {
  citizens: Citizen[]
  districtNames: Map<String, number> 
  moveCitizen: (
    citizen: Citizen,
    newDistrict: number | null
  ) => void
  updateCitizen?: (c: Citizen) => void
  district?: District
  disabled?: boolean
  updateDistrict?: (d: District) => void
}

export default function DistrictCitizens(props: Props) {
  const { district, citizens, disabled, districtNames } = props
  const { updateCitizen, moveCitizen, updateDistrict } = props

  const teamTotal = useMemo(() => citizens.map(citizen => {
    let value = 0
    if (citizen.assignedPosition) {
      value += citizen.basketBallAptitude
      if (citizen.assignedPosition === citizen.preferredPosition) value += SCORES.matchesPosition
      if (citizen.preferredPosition === Position.Generalist) value += SCORES.matchesPosition
      if (citizen.trainingValue) value += citizen.trainingValue
    }
    return value
  }).reduce((t, c) => t + c), [citizens])

  const updateFacility = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (district && updateDistrict) {
      district.facilities.advancedTraining = e.target.checked
      updateDistrict(district)
    }
  }, [district, updateDistrict])

  return (
    <div>
      <br/>
      {
        (district) ? 
          <div>
            <h4>{`District ${district.name} | Last Round Score: ${teamTotal}`}</h4>
            <CheckBox
              label={`Advanced Training Facility`}
              checked={district.facilities.advancedTraining}
              onChange={updateFacility}
              disabled={disabled || !district}
            />
          </div> : <div />
      }
      {citizens.map((citizen, i) => {

        const move = (newDistrict: number | null) => moveCitizen(citizen, newDistrict)

        return (<CitizenCard
            key={i}
            citizen={citizen}
            district={district}
            update={updateCitizen}
            disabled={disabled || !updateCitizen}
            move={move}
            districtNames={districtNames}
          />)
        }
      )}
    </div>
  )
}
