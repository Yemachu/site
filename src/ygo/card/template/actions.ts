import { createAction, ActionType } from "typesafe-actions";
import { Template } from "./type";

export const set = createAction(
  "@ygo/card/template/SET",
  (template: Template) => template
)();

export type RootAction = 
| ActionType<typeof set>
;

export const all = [
  set,
];