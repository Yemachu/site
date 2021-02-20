import { combineReducers } from "redux";

import { name, Name } from "./name";
import { level, Level } from "./level";
import { attribute, Attribute } from "./attribute";
import { template, Template } from "./template";
import { rarity, Rarity } from "./rarity";
import { effect, Effect } from "./effect";

export type Card = {
  readonly name: Name;
  readonly level: Level;
  readonly attribute: Attribute;
  readonly template: Template;
  readonly rarity: Rarity;
  readonly effect: Effect;
};
export const card = combineReducers<Card>({
  name,
  level,
  attribute,
  template,
  rarity,
  effect,
});