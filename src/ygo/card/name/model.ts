import { createReducer } from "typesafe-actions";

import { set } from "./actions";

const defaultName = "";

export type Name = string;
export const name = createReducer<Name>(defaultName)
.handleAction(set, (state, action) => {
  return action.payload;
})
;