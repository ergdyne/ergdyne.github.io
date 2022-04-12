
import { Citizen } from "./citizen";
import createCitizens from "./createCitizens";

export default function runDraft(governorCount: number, citizensPerGovernor: number): Citizen[][]{
  const citizens = createCitizens(governorCount*citizensPerGovernor)
  const results: Citizen[][] = []
  for(let i=0; i<governorCount; i++){
    results.push([])
  }
  let round = 0
  
  while (round < citizensPerGovernor) {
    if (round%2 == 0) {
      for(let i=0; i<governorCount; i++) {
        results[i].push(citizens[round*governorCount + i])
      }
    } else {
      let j = 0
      for(let i=governorCount - 1; i >= 0; i--) {
        results[i].push(citizens[round*governorCount + j])
        j++
      }
    }
    round++
  }
  return results
}
