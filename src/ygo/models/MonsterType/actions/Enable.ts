export const ID = "ygo.card.monsterType.ENABLE";

export interface EnableAction {
	type: typeof ID;
}

export function enable(): EnableAction {
	return { type: ID }
}