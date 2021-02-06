import { createReducer } from "typesafe-actions";
import { set } from "./actions";

export enum Template
{
  NORMAL = "NORMAL",
  EFFECT = "EFFECT",
  RITUAL = "RITUAL",
  FUSION = "FUSION",
  SYNCHRO = "SYNCHRO",
  DARK_SYNCHRO = "DARK SYNCHRO",
  XYZ = "XYZ",
  LINK = "LINK",
  SPELL = "SPELL",
  TRAP = "TRAP",
  SKILL = "SKILL",
  TOKEN = "TOKEN",
}

export const template = createReducer(Template.NORMAL)
.handleAction(set, (state, action) => state)
;