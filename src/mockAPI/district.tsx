import { Citizen } from "./citizen"

export enum Facility {
  AdvancedTraining = 'Advanced Training'
}

// manually designating the facilities to deal with local
// should be changed to JSON for actual setup
export interface FacilityStatus {
  advancedTraining: boolean
}

export interface District {
  name: String
  facilities: FacilityStatus
  citizens: Citizen[]
}
