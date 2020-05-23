export const ID = "ygo.card.monsterType.SET";

export interface SetAction {
	type: typeof ID;
}

export function set(): SetAction {
	return { type: ID }
}