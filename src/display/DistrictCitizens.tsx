import React from 'react'
import { Citizen } from '../mockAPI/citizen'
import CitizenCard from './CitizenCard'

interface Props {
  citizens: Citizen[]
  updateCitizen?: (c: Citizen) => void
  districtNumber?: number
  disabled?: boolean
}

export default function DistrictCitizens(props: Props) {
  const { districtNumber, citizens, updateCitizen, disabled } = props
  return (<div>
    <br/>
    {(districtNumber) ? <h4>{`District ${districtNumber}`}</h4> : <div/>}
    {citizens.map((citizen, i) => <CitizenCard
        key={i}
        citizen={citizen}
        update={updateCitizen}
        disabled={disabled || !updateCitizen}
      />
    )}
  </div>)
}
