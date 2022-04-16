import { debug } from "console"
import randomSummation from "../functions/randomSummation"
import { Assignment, Citizen, Position } from "./citizen"
import createCitizens from "./createCitizens"
import runDraft from "./runDraft"

const SCOUT_NUMBERS = 20
const SCOUT_MAX = 40

const GOVERNORS = 16
const INITIAL_CITIZENS = 10

const ADDITIONAL_CITIZENS = 20

const GAME_DATA = 'GAME_DATA'

export const EMPTY_GAME_DATA: GameData = {
  draft: [[]],
  rosters: [],
  scavengerNumbers: [],
  extraCitizens: [],
  scoutNumbers: 0,
  scoutMax: 0,
  governors: 0,
  initialCitizens: 0,
  additionalCitizens: 0,
}

const EMPTY_ROSTER: Map<Position, Citizen | null> = new Map<Position, Citizen | null>()
EMPTY_ROSTER.set(Position.Center, null)


export interface GameData {
  draft: Citizen[][]
  rosters: Map<Position, Citizen | null>[]
  scavengerNumbers: number[]
  extraCitizens: Citizen[]
  scoutNumbers: number
  scoutMax: number
  governors: number
  initialCitizens: number
  additionalCitizens: number
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
    additionalCitizens
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

export function updatePositionAssignment(
  gameData: GameData,
  district: number,
  citizen: Citizen,
  position: Position
): GameData {
  if (gameData.draft.length <= district) {
    console.log("Error updatePositionAssignment: invalid district ", district, gameData)
    return gameData
  }
  if (!gameData.rosters || gameData.rosters.length <= district) {
    console.log("Error updatePositionAssignment: no rosters", district, gameData)
    return gameData
  }
  const citizens = gameData.draft[district]
  const roster = gameData.rosters[district]
  const oldPlayer = roster.get(position)

  for(let i = 0; i < citizens.length; i++) {
    if (oldPlayer) {
      if (citizens[i].name === oldPlayer.name) {
        citizens[i].assignedPosition = undefined
      }
    }
    if (citizens[i].name === citizen.name) {
      citizens[i].assignedPosition = position
      citizens[i].assignment = Assignment.Training
    }
  }
  roster.set(position, citizen)
  updateGameData(gameData)
  return gameData
}
