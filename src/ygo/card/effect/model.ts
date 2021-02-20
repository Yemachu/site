import { createReducer } from "typesafe-actions";

import { set } from "./actions";

const defaultEffect = "";

export type Effect = string;
export const effect = createReducer<Effect>(defaultEffect)
.handleAction(set, (state, action) => {
  return action.payload;
})
;