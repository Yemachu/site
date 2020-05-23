export const ID = "ygo.card.monsterType.ADD";

export interface AddAction {
	type: typeof ID;
}

export function add(): AddAction {
	return { type: ID }
}