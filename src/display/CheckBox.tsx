import React from "react"

import fields from "./fields.module.css"

interface Props {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const CheckBox = (props: Props): JSX.Element => {
  const { label, checked, onChange, disabled } = props
  return (
    <div className={fields.container}>
      <div className={fields.checkBox}>
        <input
          name={label}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </div>
      
      <div className={fields.label}>{label}</div>
    </div>
  )
}

export default CheckBox
