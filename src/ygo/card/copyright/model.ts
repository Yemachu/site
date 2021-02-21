import { createReducer } from "typesafe-actions";
import { set } from "./actions";

export type Copyright = string;
const defaultValue: Copyright = "© 1996 Kazuki Takahashi";
export const copyright = createReducer(defaultValue)
.handleAction(set, (state, action) => action.payload)
;