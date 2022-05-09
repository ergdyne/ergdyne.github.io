import React, { useCallback } from 'react'
import { Citizen } from '../mockAPI/citizen'
import { District } from '../mockAPI/district'
import DistrictCitizens from './DistrictCitizens'

interface Props {
  draftResults: District[]
  updateCitizen: (district: number, citizen: Citizen) => void
  disabled: boolean
}

export default function DraftResults(props: Props) {
  const { draftResults, updateCitizen, disabled } = props
  return (<div>
    { draftResults.map((district, i) => {
        const citizens = district.citizens
        const citizenUpdate = useCallback(
          (citizen: Citizen) => { updateCitizen(i, citizen) },
          [citizens, i]
        )
        return (
          <DistrictCitizens
            key={i}
            citizens={citizens}
            district={district}
            updateCitizen={citizenUpdate}
            disabled={disabled}
          />
        )
      })
    }
  </div>)
}
