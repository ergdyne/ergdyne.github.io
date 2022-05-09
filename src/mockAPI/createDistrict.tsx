import { Citizen } from "./citizen";
import { District } from "./district";

export default function createDistrict(citizens: Citizen[], name: String): District {
  return {
    name: name,
    citizens: citizens,
    facilities: {
      advancedTraining: false,
    },
  }
}
