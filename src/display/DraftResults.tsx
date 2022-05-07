import React, { useCallback } from 'react'
import { Citizen } from '../mockAPI/citizen'
import DistrictCitizens from './DistrictCitizens'

interface Props {
  draftResults: Citizen[][]
  updateCitizen: (district: number, citizen: Citizen) => void
  disabled: boolean
}

export default function DraftResults(props: Props) {
  const { draftResults, updateCitizen, disabled } = props
  return (<div>
    { draftResults.map((citizens, i) => {
        const citizenUpdate = useCallback(
          (citizen: Citizen) => { updateCitizen(i, citizen) },
          [citizens, i]
        )
        return (
          <DistrictCitizens
            key = {i}
            citizens = {citizens}
            districtNumber = {i + 137}
            updateCitizen={citizenUpdate}
            disabled={disabled}
          />
        )
      })
    }
  </div>)
}
