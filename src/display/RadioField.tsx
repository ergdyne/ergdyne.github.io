import React, { useCallback } from "react"
import Button from 'react-bootstrap/Button'
import Option from "../types/Option"
import fields from "./fields.module.css"

interface OptionProps {
  option: Option
  onChange: (value: string) => void
  value?: string
  preferedValue?: string
  disabled?: boolean
}

interface Props {
  options: Option[]
  onChange: (value: string) => void
  disabled?: boolean
  label?: string
  inline?: boolean
  value?: string
  preferedValue?: string
}

const RadioOption = (props: OptionProps): JSX.Element => {
  const { option, value, onChange, preferedValue, disabled } = props
  const onClick = useCallback(() => { onChange(option.value) }, [option, onChange])
  const selected = option.value === value
  const variant = selected ? "warning" : (preferedValue === option.value ? "secondary" : "dark")

  return (
    <Button
      className={fields.radioToggle}
      onClick={onClick}
      disabled={selected || disabled}
      variant={variant}
    >
      {option.label}  
    </Button>
  )
}

const RadioField = (props: Props): JSX.Element => {
  const { value, options, onChange, disabled, label, inline, preferedValue } = props
  return (
    <div className={`${fields.container} ${fields.radioNoWrap} ${inline ? fields.left : ''}`}>
      {label ? <div className={fields.label}>{label}</div> : <></>}
      { options.map(option => <RadioOption
          key={option.value}
          option={option}
          value={value}
          onChange={onChange}
          disabled={disabled}
          preferedValue={preferedValue}
        />)
      }
    </div>
  )

}

export default RadioField
