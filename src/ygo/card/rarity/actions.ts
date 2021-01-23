import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/rarity/SET",
  (value: unknown) => value
)();

export type RootAction = 
| ActionType<typeof set> 
;

export const all = [
  set,
];