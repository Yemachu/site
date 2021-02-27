import { createAction, ActionType } from "typesafe-actions";

export const set = createAction(
  "@ygo/card/copyright/SET",
  (value: string) => value
)();

export const all = [
  set,
];

export type RootAction =
| ActionType<typeof set>
;