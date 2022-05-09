import React, { useCallback } from 'react'
import { Citizen } from '../mockAPI/citizen'
import { District } from '../mockAPI/district'
import DistrictCitizens from './DistrictCitizens'

interface Props {
  draftResults: District[]
  updateCitizen: (district: number, citizen: Citizen) => void
  disabled: boolean
  districtNames: Map<String, number> 
  moveCitizen: (
    currentDistrict: number | null,
    citizen: Citizen,
    newDistrict: number | null
  ) => void

}

export default function DraftResults(props: Props) {
  const { draftResults, updateCitizen, disabled, moveCitizen, districtNames } = props
  return (<div>
    { draftResults.map((district, i) => {
        const citizens = district.citizens
        const citizenUpdate = useCallback(
          (citizen: Citizen) => { updateCitizen(i, citizen) },
          [citizens, i]
        )

        const moveDistrictCitizen = (
          citizen: Citizen,
          newDistrict: number | null
        ) => moveCitizen(i, citizen, newDistrict)

        return (
          <DistrictCitizens
            key={i}
            citizens={citizens}
            district={district}
            updateCitizen={citizenUpdate}
            disabled={disabled}
            districtNames={districtNames}
            moveCitizen={moveDistrictCitizen}
          />
        )
      })
    }
  </div>)
}
