import { createAction, ActionType } from "typesafe-actions";

export const setEffect = createAction(
  "@ygo/card/pendulum/effect/SET",

)();

//export const set

export const all = [
  setEffect,
];

export type RootAction =
| ActionType<typeof setEffect>
;