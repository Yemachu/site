import { actions as name } from "./name";
import { actions as level } from "./level";
import { actions as attribute } from "./attribute";
import { actions as template } from "./template";
import { actions as rarity} from "./rarity";
import { actions as effect } from "./effect";
import { actions as pendulum } from "./pendulum";
import { actions as copyright } from "./copyright"; 

export type RootAction =
| name.RootAction
| level.RootAction
| attribute.RootAction
| template.RootAction
| rarity.RootAction
| effect.RootAction
| pendulum.RootAction
| copyright.RootAction
;

export { 
  name, 
  level,
  attribute,
  template,
  rarity,
  effect,
  pendulum,
  copyright,
};

export const all = [
  ...name.all,
  ...level.all,
  ...attribute.all,
  ...template.all,
  ...rarity.all,
  ...effect.all,
  ...pendulum.all,
  ...copyright.all,
];