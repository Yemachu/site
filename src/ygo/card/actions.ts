import { actions as name } from "./name";
import { actions as level } from "./level";

export type RootAction =
| name.RootAction
| level.RootAction
;

export { 
  name, 
  level,
};

export const all = [
  ...name.all,
  ...level.all,
];