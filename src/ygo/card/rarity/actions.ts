import { createAction, ActionType } from "typesafe-actions";
import { Rarity } from "./type";

export const set = createAction(
  "@ygo/card/rarity/SET",
  (value: Rarity) => value
)();

export type RootAction = 
| ActionType<typeof set> 
;

export const all = [
  set,
];