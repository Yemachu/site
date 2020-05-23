export const ID = "ygo.card.monsterType.RESET";

export interface ResetAction
{
	type: typeof ID;
}

export function reset(): ResetAction
{
	return { type: ID }
}