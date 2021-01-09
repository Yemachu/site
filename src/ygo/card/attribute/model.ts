import { createReducer } from "typesafe-actions";

import { set } from "./actions";

export enum Attribute {
  NONE   = "NONE",
  DARK   = "DARK",
  DIVINE = "DIVINE",
  EARTH  = "EARTH",
  FIRE   = "FIRE",
  LIGHT  = "LIGHT",
  WATER  = "WATER",
  WIND   = "WIND",
  SPELL  = "SPELL",
  TRAP   = "TRAP",
}

export const attribute = createReducer<Attribute>(Attribute.NONE)
.handleAction(set, (state) => state)
;