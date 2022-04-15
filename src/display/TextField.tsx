import React from "react"

import fields from "./fields.module.css"

interface Props {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const TextField = (props: Props): JSX.Element => {
  const { label, value, disabled, onChange } = props
  return (
    <div className={fields.container}>
      <div className={fields.label}>{label}</div>
      <input
        type="text"
        className={fields.textField}
        disabled={disabled}
        value={value}
        onChange={onChange}/>
    </div>
  )
}

export default TextField
