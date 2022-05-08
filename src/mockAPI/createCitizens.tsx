import randomFromList from '../functions/randomFromList';
import getNames from './getNames';
import { Citizen, POSITIONS, MAX_BASKETBALL_APTITUDE, Assignment } from './citizen';

export default function createCitizens(amount: number, sorted:boolean = true): Citizen[] {
  //Sorted by basketball Aptitude
  const citizens: Citizen[] = getNames(amount).map(name => {
    const citizen: Citizen = {
      name: name,
      basketBallAptitude: Math.ceil(Math.random() * MAX_BASKETBALL_APTITUDE),
      preferredPosition: randomFromList(POSITIONS),
      assignment: Assignment.Labor,
      trainingValue: 0,
    }
    return citizen
  })
  if(sorted) citizens.sort((a, b) => b.basketBallAptitude - a.basketBallAptitude)
  return citizens
}
