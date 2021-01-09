import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/attribute/SET",
)();

export type RootAction = 
| ActionType<typeof set>
;

export const all = [
  set,
];