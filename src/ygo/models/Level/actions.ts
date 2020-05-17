import { AllowedValues, Level } from "./type";

export const SET_LEVEL = "ygo.card.level.SET";
export const INCREMENT = "ygo.card.level.INCREMENT";
export const DECREMENT = "ygo.card.level.DECREMENT";
export const MIRROR = "ygo.card.level.MIRROR";

interface SetAction {
	type: typeof SET_LEVEL;
	payload: AllowedValues;
}

export function set(value: AllowedValues): SetAction {
	return { type: SET_LEVEL, payload: value };
}


interface IncrementAction {
	type: typeof INCREMENT;
}

export function increment(): IncrementAction
{
	return { type: INCREMENT };
}

interface DecrementAction {
	type: typeof DECREMENT;
}

export function decrement(): DecrementAction
{
	return { type: DECREMENT };
}

interface MirrorAction {
	type: typeof MIRROR;
}

export function mirror(): MirrorAction
{
	return { type: MIRROR };
}

export type ActionTypes = 
	| SetAction 
	| IncrementAction 
	| DecrementAction
	| MirrorAction
	;
