import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/name/SET",
  (value) => value
)();

export type RootAction = 
| ActionType<typeof set>
;

export const all = [
  set,
  
];