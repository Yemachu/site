import { combineReducers } from "redux";

import { name, Name } from "./name";
import { level, Level } from "./level";
import { attribute, Attribute } from "./attribute";

export type Card = {
  readonly name: Name;
  readonly level: Level;
  readonly attribute: Attribute;
};
export const card = combineReducers<Card>({
  name,
  level,
  attribute,
});