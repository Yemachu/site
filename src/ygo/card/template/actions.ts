import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/template/SET"
)();

export type RootAction = 
| ActionType<typeof set>
;

export const all = [
  set,
];