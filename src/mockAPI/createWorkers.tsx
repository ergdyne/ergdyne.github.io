import randomFromList from '../functions/randomFromList';
import getNames from './getNames';
import { Worker, POSITIONS, MAX_BASKETBALL_APTITUDE, Assignment } from './worker';

export default function createWorkers(amount: number): Worker[] {
  //Sorted by basketball Aptitude
  const workers: Worker[] = getNames(amount).map(name => {
    const worker: Worker = {
      name: name,
      basketBallAptitude: Math.ceil(Math.random() * MAX_BASKETBALL_APTITUDE),
      preferredPosition: randomFromList(POSITIONS),
      assignment: Assignment.Labor,
    }
    return worker
  })
  workers.sort((a, b) => b.basketBallAptitude - a.basketBallAptitude)
  return workers
}
