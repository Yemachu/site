import { Rarity } from "../type";
export const ID = "ygo.card.rarity.SET";

export interface SetAction {
	type: typeof ID;
	readonly payload: Rarity;
}

export function set(value: Rarity): SetAction {
	return { type: ID, payload: value };
}