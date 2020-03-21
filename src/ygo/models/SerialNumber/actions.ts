export const ILLEGALIZE = "ygo.card.serial.ILLEGALIZE";
export const RANDOMIZE = "ygo.card.serial.RANDOMIZE";

interface IllegalizeAction
{
	type: typeof ILLEGALIZE;
}

export function illegalize(): IllegalizeAction
{
	return { type: ILLEGALIZE };
}

interface RandomizeAction
{
	type: typeof RANDOMIZE;
}

export function randomize(): RandomizeAction
{
	return { type: RANDOMIZE };
}

export type ActionTypes = RandomizeAction | IllegalizeAction;