import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Citizen } from "../mockAPI/citizen";
import movemodal from "./movemodal.module.css"

interface Props {
  show: boolean
  citizen: Citizen
  excludeDismiss: boolean
  districtNames: Map<String, number>
  move: (newDistrict: number | null) => void
  handleClose: () => void
  currentDistrict?: String
}

export default function MoveModal(props: Props) {
  const [disabled, setDisabled] = useState(false)
  const disable = () => setDisabled(true)
  const enable = () => setDisabled(false)

  const { show, citizen, excludeDismiss, districtNames, move, handleClose, currentDistrict } = props
  const close = () => {
    enable()
    handleClose()
  }
  const dismiss = () => {
    disable()
    move(null)
    close()
  }
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{`Select Destination for ${citizen.name}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {Array.from(districtNames)
        .filter(([name, _]) => name !== currentDistrict)
        .map(([name, index]) => {
          const toDistrict = () => {
            disable()
            move(index)
            close()
          }
          return (
            <div className={movemodal.button} key={index}>
              <Button onClick={toDistrict} variant="warning">{`District ${name}`}</Button>
            </div>
          )
        })
      }
      {(excludeDismiss) ?
        <></> :
        <Button onClick={dismiss} variant="danger">{`Dismiss Citizen`}</Button>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>{`Back`}</Button>
    </Modal.Footer>
    </Modal>
  )
}
