import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button'

import './App.css';
import DraftResults from './display/DraftResults';
import TextField from './display/TextField';
import ScavengerTotals from './display/ScavengerTotals';
import { getOrCreateGameData, resetGameData, updateGameData, updatePositionAssignment } from './mockAPI/localStorage';
import DistrictCitizens from './display/DistrictCitizens';
import { Position } from './mockAPI/citizen';


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

  updatePositionAssignment(gameData, 0, gameData.draft[0][0], Position.Center)
  updatePositionAssignment(gameData, 0, gameData.draft[0][1], Position.Center)
  updatePositionAssignment(gameData, 0, gameData.draft[0][2], Position.ShootingGuard)

  return (
    <div className="App">
      <Button disabled={disabled} variant='warning' onClick={resetData}>Reset Game</Button>
      <h3>Configuration</h3>
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
      <DraftResults draftResults={gameData.draft} />

      <br/>
      <h3>Additional Citizens</h3>
      <DistrictCitizens citizens={gameData.extraCitizens}/>

  </div>
  );
}

export default App;
