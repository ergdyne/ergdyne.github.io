import randomSummation from "../functions/randomSummation"
import { Citizen } from "./citizen"
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
  scavengerNumbers: [],
  extraCitizens: [],
  scoutNumbers: 0,
  scoutMax: 0,
  governors: 0,
  initialCitizens: 0,
  additionalCitizens: 0,
}


export interface GameData {
  draft: Citizen[][]
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
  const gameData: GameData = {
    draft,
    scavengerNumbers,
    extraCitizens,
    scoutNumbers,
    scoutMax,
    governors,
    initialCitizens,
    additionalCitizens
  }
  localStorage.setItem(GAME_DATA, JSON.stringify(gameData))
  return gameData
}

export function getOrCreateGameData() {
  const gameData: string | null = localStorage.getItem(GAME_DATA)
  const result: GameData = gameData ? JSON.parse(gameData) : createAndSetGameData()
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
