export const ID = "ygo.card.monsterType.REMOVE";

export interface RemoveAction {
	type: typeof ID;
	index: number;
}

export function remove(index: number): RemoveAction {
	return { type: ID, index };
}