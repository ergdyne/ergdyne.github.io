import React from "react"
import { urlToHttpOptions } from "url"
import Option from "../types/Option"
import fields from "./fields.module.css"

interface OptionProps {
  option: Option
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}


interface Props {
  options: Option[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  label?: string
  inline?: boolean
  value?: string
}

const RadioOption = (props: OptionProps): JSX.Element => {
  const { option, value, onChange } = props
  return (
    <label className={fields.radioOption}>
      <input
        className={fields.radioToggle}
        type="radio"
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
      />
      {option.label}
    </label>
  )
}

const RadioField = (props: Props): JSX.Element => {
  const { value, options, onChange, disabled, label, inline } = props
  return (
    <div className={`${fields.container} ${inline ? fields.radioNoWrap : ''}`}>
      {label ? <div className={fields.label}>{label}</div> : <></>}
      { options.map(option => <RadioOption
          key={option.value}
          option={option}
          value={value}
          onChange={onChange}
        />)
      }
    </div>
  )

}

export default RadioField
