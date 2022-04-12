import React from 'react'
import { Citizen } from '../mockAPI/citizen'
import CitizenCard from './CitizenCard'

interface Props {
  citizens: Citizen[]
  districtNumber: number
}

export default function DistrictCitizens(props: Props) {
  const { districtNumber, citizens } = props
  return (<div>
    <br/>
    <h4>{`District ${districtNumber}`}</h4>
    {citizens.map((citizen, i) => <CitizenCard key={i} citizen={citizen}/>)}
  </div>)
}
