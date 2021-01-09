import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/level/SET",
  (value: number) => value,
)();

export const mirror = createAction(
  "@ygo/card/level/MIRROR",
)();

export type RootAction = 
| ActionType<typeof set>
| ActionType<typeof mirror>
;

export const all = [
  set,
  mirror,
];