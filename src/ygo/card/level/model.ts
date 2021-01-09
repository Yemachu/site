import { createReducer } from "typesafe-actions";

import { set, mirror } from "./actions";


export type Level = {
  readonly value: number;
  readonly mirror: boolean;
};

const defaultLevel = {
  value: 0,
  mirror: false
};

export const level = createReducer<Level>(defaultLevel)
.handleAction(set, (state, action) => {
  return { ...state, value: action.payload };
})
.handleAction(mirror, (state) => {
  return { ...state, mirror: !state.mirror };
})
;
