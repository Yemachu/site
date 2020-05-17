import { SerialNumber } from "./type";

export const SET = "ygo.card.serial.SET";
export const ILLEGALIZE = "ygo.card.serial.ILLEGALIZE";
export const RANDOMIZE = "ygo.card.serial.RANDOMIZE";


interface SetAction
{
	type: typeof SET;
	value: SerialNumber;
}

export function set(value: SerialNumber): SetAction
{
	return {
		type: SET,
		value: value,
	};
}

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

export type ActionTypes 
	= SetAction
	| RandomizeAction 
	| IllegalizeAction;