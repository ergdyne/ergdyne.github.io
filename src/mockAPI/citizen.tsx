
import Option from "../types/Option"

export enum Position {
  PointGuard = 'Point Guard',
  ShootingGuard = 'Shooting Guard',
  SmallForward = 'Small Forward',
  PowerForward = 'Power Forward',
  Center = 'Center',
  Generalist = 'Generalist',
}

export const POSITIONS: Position[] = [
  Position.Center,
  Position.Generalist,
  Position.PointGuard,
  Position.PowerForward,
  Position.ShootingGuard,
  Position.SmallForward,
]

export const POSITION_OPTIONS: Option[] = POSITIONS.filter(
  x => x !== Position.Generalist
).map(x => { return { label: x, value: x } })

export enum Assignment {
  Labor = 'Labor',
  Scavenger = 'Scavenger',
  Training = 'Training',
}

export const MAX_BASKETBALL_APTITUDE = 100

export interface Citizen {
  name: String
  preferredPosition: Position
  basketBallAptitude: number
  assignment: Assignment
  assignedPosition?: Position
  //Store other information such as injury and current skill and UID
}
