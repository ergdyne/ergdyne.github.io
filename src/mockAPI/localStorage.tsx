import randomSummation from "../functions/randomSummation"
import { Assignment, Citizen, Position, SCORES } from "./citizen"
import createCitizens from "./createCitizens"
import { District } from "./district"
import runDraft from "./runDraft"

const SCOUT_NUMBERS = 20
const SCOUT_MAX = 40

const GOVERNORS = 16
const INITIAL_CITIZENS = 10

const ADDITIONAL_CITIZENS = 20

const GAME_DATA = 'GAME_DATA'

export const EMPTY_GAME_DATA: GameData = {
  draft: [],
  rosters: [],
  scavengerNumbers: [],
  extraCitizens: [],
  scoutNumbers: 0,
  scoutMax: 0,
  governors: 0,
  initialCitizens: 0,
  additionalCitizens: 0,
  round: 0,
}

const EMPTY_ROSTER: Map<Position, Citizen | null> = new Map<Position, Citizen | null>()
EMPTY_ROSTER.set(Position.Center, null)


export interface GameData {
  draft: District[]
  rosters: Map<Position, Citizen | null>[]
  scavengerNumbers: number[]
  extraCitizens: Citizen[]
  scoutNumbers: number
  scoutMax: number
  governors: number
  initialCitizens: number
  additionalCitizens: number
  round: number
}

export function createAndSetGameData(
  scoutNumbers: number = SCOUT_NUMBERS,
  scoutMax: number = SCOUT_MAX,
  governors: number = GOVERNORS,
  initialCitizens: number = INITIAL_CITIZENS,
  additionalCitizens: number = ADDITIONAL_CITIZENS,
): GameData {
  const draft = runDraft(governors, initialCitizens)
  const scavengerNumbers = randomSummation(scoutNumbers, scoutMax)
  const extraCitizens = createCitizens(additionalCitizens, false)
  const rosters = draft.map( _ => new Map(EMPTY_ROSTER))
  const gameData: GameData = {
    draft,
    rosters,
    scavengerNumbers,
    extraCitizens,
    scoutNumbers,
    scoutMax,
    governors,
    initialCitizens,
    additionalCitizens,
    round: 0,
  }
  
  return updateGameData(gameData)
}

export function getOrCreateGameData() {
  const gameData: string | null = localStorage.getItem(GAME_DATA)
  const result: GameData = gameData ? JSON.parse(gameData) : createAndSetGameData()
  //convert objects to maps
  result.rosters = result.rosters.map(r => new Map(Object.entries(r)) as Map<Position, Citizen | null>)
  return result
}

export function resetGameData() {
  const gameData = getOrCreateGameData()
  return createAndSetGameData(
    gameData.scoutNumbers,
    gameData.scoutMax,
    gameData.governors,
    gameData.initialCitizens,
    gameData.additionalCitizens,
  )
}

export function updateGameData(gameData: GameData): GameData {
  const tempData: any = gameData
  //handle conversion to objects
  tempData.rosters = gameData.rosters.map(r => Object.fromEntries(r))
  localStorage.setItem(GAME_DATA, JSON.stringify(tempData))
  //Handle conversion back to map
  gameData.rosters = gameData.rosters.map(r => new Map(Object.entries(r)) as Map<Position, Citizen | null>)
  return gameData
}

function citizenUpdater(
  gameData: GameData,
  district: number,
  citizen: Citizen
): GameData {
  if (gameData.draft.length <= district) {
    console.log("Error updatePositionAssignment: invalid district ", district, gameData)
    return gameData
  }
  if (!gameData.rosters || gameData.rosters.length <= district) {
    console.log("Error updatePositionAssignment: no rosters", district, gameData)
    return gameData
  }
  const citizens = gameData.draft[district].citizens
  const roster = gameData.rosters[district]
  const position = citizen.assignedPosition
  const oldPlayer = !position ? undefined : roster.get(position)
  for (let i = 0; i < citizens.length; i++) {
    if (oldPlayer && oldPlayer.name) {
      if (citizens[i].name === oldPlayer.name) {
        citizens[i].assignedPosition = undefined
      }
    }
    if (citizens[i].name === citizen.name) {
      const oldPosition = citizens[i].assignedPosition
      if (oldPosition && citizen.assignedPosition !== oldPosition) roster.set(oldPosition, null)
      citizens[i] = citizen
    }
  }
  if (position) roster.set(position, citizen)
  
  return updateGameData(gameData)
}

export function updateCitizen(
  district: number,
  citizen: Citizen
): GameData {
  return citizenUpdater(getOrCreateGameData(), district, citizen)
}

export function progressRound(): GameData {
  const gameData = getOrCreateGameData()
  for (let d = 0; d < gameData.draft.length; d++) {
    const maxTraining =
      gameData.draft[d].facilities.advancedTraining ? SCORES.advancedFacility : SCORES.basicFacility
    for (let c = 0; c < gameData.draft[d].citizens.length; c++) {
      const citizen = gameData.draft[d].citizens[c]
      let trainingValue = citizen.trainingValue
      if (citizen.assignment === Assignment.Training) {
        trainingValue = Math.min(maxTraining, trainingValue + SCORES.trainingOn)
      } else {
        trainingValue = Math.max(0, trainingValue + SCORES.trainingOff)
      }
      gameData.draft[d].citizens[c].trainingValue = trainingValue
    }
  }
  gameData.round += 1
  return updateGameData(gameData)
}