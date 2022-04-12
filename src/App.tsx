import React from 'react';
import './App.css';
import { getOrCreateGameData } from './mockAPI/localStorage';


//Change these to change output


function App() {
  // TEMP Logging
  console.log(getOrCreateGameData())

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Check the console for the results
        </p>
      </header>
    </div>
  );
}

export default App;
