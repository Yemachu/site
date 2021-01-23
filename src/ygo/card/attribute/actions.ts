import { createAction, ActionType } from "typesafe-actions";
import { Attribute } from "./type";

export const set = createAction(
  "@ygo/card/attribute/SET",
  (attribute: Attribute) => attribute
)();

export type RootAction = 
| ActionType<typeof set>
;

export const all = [
  set,
];