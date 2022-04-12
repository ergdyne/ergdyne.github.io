import React from 'react';
import './App.css';
import DraftResults from './display/DraftResults';
import ScavengerTotals from './display/ScavengerTotals';
import { getOrCreateGameData } from './mockAPI/localStorage';


//Change these to change output


function App() {
  // TEMP Logging
  const gameData = getOrCreateGameData()
  console.log(gameData)

  return (
    <div className="App">
      <h3>Scavenger Values</h3>
      <ScavengerTotals values={gameData.scavengerNumbers || []} />
      <br/>
      <h3>Draft Results</h3>
      <DraftResults draftResults={gameData.draft} />
  </div>
  );
}

export default App;
