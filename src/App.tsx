import React from 'react';
import logo from './logo.svg';
import './App.css';

import randomSummation from './functions/randomSummation';
import runDraft from './mockAPI/runDraft';
import createWorkers from './mockAPI/createWorkers';

//Change these to change output
const SCOUT_NUMBERS = 20
const SCOUT_MAX = 40

const GOVERNORS = 16
const INITIAL_WORKERS = 10

const ADDITIONAL_WORKERS = 20

function App() {
  // TEMP Logging
  console.log("---------------Scout Totals------------------")
  console.log(randomSummation(SCOUT_NUMBERS, SCOUT_MAX))
  console.log("---------------Draft Results------------------")
  const draft = runDraft(GOVERNORS, INITIAL_WORKERS)
  draft.forEach((workers, index) => {
    console.log(`---------------Governer # ${index + 1}---------------`)
    console.log(workers)
  })
  console.log("---------------Copyable Draft Result------------------")
  console.log(draft)

  console.log("---------------Random Workers------------------")
  console.log(createWorkers(ADDITIONAL_WORKERS, false))

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
