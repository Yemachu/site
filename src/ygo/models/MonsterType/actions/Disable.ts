export const ID = "ygo.card.monsterType.DISABLE";

export interface DisableAction {
	type: typeof ID;
}

export function disable(): DisableAction {
	return { type: ID }
}