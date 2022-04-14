import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button'

import './App.css';
import DraftResults from './display/DraftResults';
import ScavengerTotals from './display/ScavengerTotals';
import { getOrCreateGameData, resetGameData } from './mockAPI/localStorage';


//Change these to change output


function App() {
  const [disabled, setDisabled] = useState(false)
  const [gameData, setGameData] = useState(getOrCreateGameData())
  // TEMP Logging
  // console.log(gameData)
  const resetData = useCallback(() => {
    //For when using actual API
    console.log("LOOP")
    setDisabled(true)
    setGameData(resetGameData())
    // console.log(gameData)
    setDisabled(false)
  }, [resetGameData])

  return (
    <div className="App">
      <Button disabled={disabled} variant='warning' onClick={resetData}>Reset Game</Button>
      <h3>Scavenger Values</h3>
      <ScavengerTotals values={gameData.scavengerNumbers || []} />
      <br/>
      <h3>Draft Results</h3>
      <DraftResults draftResults={gameData.draft} />
  </div>
  );
}

export default App;
