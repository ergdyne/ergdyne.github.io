import React from 'react'
import { Citizen } from '../mockAPI/citizen'
import DistrictCitizens from './DistrictCitizens'

interface Props {
  draftResults: Citizen[][]
}

export default function DraftResults(props: Props) {
  return (<div>
    { props.draftResults.map((citizens, i) => <DistrictCitizens
        key = {i}
        citizens = {citizens}
        districtNumber = {i + 137}
      />)
    }
  </div>)
}
