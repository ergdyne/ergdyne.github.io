import React, { useCallback } from "react"
import Button from 'react-bootstrap/Button'
import Option from "../types/Option"
import fields from "./fields.module.css"

interface OptionProps {
  option: Option
  onChange: (value: string | number) => void
  value?: string
}


interface Props {
  options: Option[]
  onChange: (value: string | number) => void
  disabled?: boolean
  label?: string
  inline?: boolean
  value?: string
}

const RadioOption = (props: OptionProps): JSX.Element => {
  const { option, value, onChange } = props
  const onClick = useCallback(() => { onChange(option.value) }, [option, onChange])
  const selected = option.value === value

  return (
    <Button
      className={fields.radioToggle}
      onClick={onClick}
      disabled={selected}
      variant={selected ? "light" : "dark"}
    >
      {option.label}  
    </Button>
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
