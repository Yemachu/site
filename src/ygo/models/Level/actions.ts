import Type from "./type";

export const SET_LEVEL = "ygo.card.level.SET";
export const INCREMENT = "ygo.card.level.INCREMENT";
export const DECREMENT = "ygo.card.level.DECREMENT";

interface SetAction {
	type: typeof SET_LEVEL;
	payload: Type;
}

export function set(value: Type): SetAction {
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

export type ActionTypes = 
	| SetAction 
	| IncrementAction 
	| DecrementAction;
