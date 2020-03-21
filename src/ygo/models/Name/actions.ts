import Type from "./type";

export const SET = "ygo.card.name.SET";

interface SetNameAction
{
	type: typeof SET;
	payload: Type;
}

export function set(value: string): SetNameAction
{
	return { type: SET, payload: value };
}

export type ActionTypes = SetNameAction;
