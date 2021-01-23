import { actions as name } from "./name";
import { actions as level } from "./level";
import { actions as attribute } from "./attribute";
import { actions as template } from "./template";

export type RootAction =
| name.RootAction
| level.RootAction
| attribute.RootAction
| template.RootAction
;

export { 
  name, 
  level,
  attribute,
  template,
};

export const all = [
  ...name.all,
  ...level.all,
  ...attribute.all,
  ...template.all,
];