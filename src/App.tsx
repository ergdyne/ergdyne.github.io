import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button'

import './App.css';
import DraftResults from './display/DraftResults';
import TextField from './display/TextField';
import ScavengerTotals from './display/ScavengerTotals';
import {
  getOrCreateGameData,
  resetGameData,
  updateGameData,
  updateCitizen,
} from './mockAPI/localStorage';
import DistrictCitizens from './display/DistrictCitizens';
import { Citizen } from './mockAPI/citizen';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';


//Change these to change output

function onChangeGameDataBuilder(
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  updateStore: (x: number) => void,
  writeStore: () => void,
): ((e: React.ChangeEvent<HTMLInputElement>) => void) {
  return useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (value !== e.target.value) { setValue(e.target.value) }
    const parsed = Number(e.target.value)
    if (Number.isInteger(parsed) && parsed > 0) {
      updateStore(parsed)
      writeStore()
    }
  }, [value, setValue, updateStore, writeStore])
}

function App() {
  const [showReset, setShowReset] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [gameData, setGameData] = useState(getOrCreateGameData())
  const [scoutNumbers, setScoutNumbers] = useState(gameData.scoutNumbers.toString())
  const [scoutMax, setScoutMax] = useState(gameData.scoutMax.toString())
  const [governors, setGovernors] = useState(gameData.governors.toString())
  const [initialCitizens, setInitialCitizens] = useState(gameData.initialCitizens.toString())
  const [
    additionalCitizens, setAdditionalCitizens
  ] = useState(gameData.additionalCitizens.toString())

  const resetData = useCallback(() => {
    //For when using actual API
    setDisabled(true)
    setGameData(resetGameData())
    setDisabled(false)
  }, [resetGameData])

  const updateCitizenData = useCallback(
    (district: number, citizen: Citizen) => {
      setDisabled(true)
      setGameData(updateCitizen(district, citizen))
      setDisabled(false)
    },
    [gameData]
  )

  function updateScoutNumbers(x: number) { gameData.scoutNumbers = x }
  function updateScoutMax(x: number) { gameData.scoutMax = x }
  function updateGovernors(x: number) { gameData.governors = x }
  function updateInitialCitizens(x: number) { gameData.initialCitizens = x }
  function updateAdditionalCitizens(x: number) { gameData.additionalCitizens = x }

  function updateData(){
    //For when using actual API
    setDisabled(true)
    setGameData(updateGameData(gameData))
    setDisabled(false)
  }

  const changeScoutNumbers = onChangeGameDataBuilder(
    scoutNumbers, setScoutNumbers, updateScoutNumbers, updateData
  )
  const changeScoutMax = onChangeGameDataBuilder(
    scoutMax, setScoutMax, updateScoutMax, updateData
  )
  const changeGovernors = onChangeGameDataBuilder(
    governors, setGovernors, updateGovernors, updateData
  )
  const changeInitialCitizens = onChangeGameDataBuilder(
    initialCitizens, setInitialCitizens, updateInitialCitizens, updateData
  )
  const changeAdditionalCitizens = onChangeGameDataBuilder(
    additionalCitizens, setAdditionalCitizens, updateAdditionalCitizens, updateData
  )

  const clickReset = useCallback(() => setShowReset(!showReset), [showReset, setShowReset])

  const confirmReset = (p: TooltipProps) => (
    <Tooltip {...p}> {
      <div>
        <h1>{`Are you sure you want to Reset?`}</h1>
        <h3>{`All data will be lost`}</h3>
        <Button variant='danger' onClick={resetData}>{`Yes, Reset the Game`}</Button>
      </div>
    } </Tooltip>
  )

  return (
    <div className="App">
      <h3>{`Configuration - Scroll to bottom to reset`}</h3>
      <TextField
        label={"Total Scavenger Values"}
        value={scoutNumbers}
        onChange={changeScoutNumbers}
        disabled={disabled}
      />
      <TextField
        label={"Max Scavenger Value"}
        value={scoutMax}
        onChange={changeScoutMax}
        disabled={disabled}
      />
      <TextField
        label={"Governors"}
        value={governors}
        onChange={changeGovernors}
        disabled={disabled}
      />
      <TextField
        label={"Initial Citizens per Governor"}
        value={initialCitizens}
        onChange={changeInitialCitizens}
        disabled={disabled}
      />
      <TextField
        label={"Total Additional Citizens"}
        value={additionalCitizens}
        onChange={changeAdditionalCitizens}
        disabled={disabled}
      />
      <h3>Scavenger Values</h3>
      <ScavengerTotals values={gameData.scavengerNumbers || []} />
      <br/>
      <h3>Draft Results</h3>
      <DraftResults
        draftResults={gameData.draft}
        updateCitizen={updateCitizenData}
        disabled={disabled}
      />

      <br/>
      <h3>Additional Citizens</h3>
      <DistrictCitizens citizens={gameData.extraCitizens}/>
      <OverlayTrigger
        placement='top'
        delay={{ show: 250, hide: 400 }}
        overlay={confirmReset}
      >
        <Button disabled={disabled} variant='warning' onClick={clickReset}>Reset Game</Button>
      </OverlayTrigger>
  </div>
  );
}

export default App;
