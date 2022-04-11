import createWorkers from "./createWorkers";
import { Worker } from "./worker";

export default function runDraft(governorCount: number, workersPerGovernor: number): Worker[][]{
  const workers = createWorkers(governorCount*workersPerGovernor)
  const results: Worker[][] = []
  for(let i=0; i<governorCount; i++){
    results.push([])
  }
  let round = 0
  
  while (round < workersPerGovernor) {
    if (round%2 == 0) {
      for(let i=0; i<governorCount; i++) {
        results[i].push(workers[round*governorCount + i])
      }
    } else {
      let j = 0
      for(let i=governorCount - 1; i >= 0; i--) {
        results[i].push(workers[round*governorCount + j])
        j++
      }
    }
    round++
  }
  return results
}
