import React from 'react'
import Button from 'react-bootstrap/Button'


interface Props {
  values: number[]
}

export default function ScavengerTotals(props: Props){
  const { values } = props
  return (
    <div>
      {
        values.map((v, i) => <Button key={i} variant={(i%2 == 0) ? "light" : "dark"}> { v } </Button>)

      }
    </div>
  )
}
