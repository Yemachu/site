import { Name } from "./type";

export const SET = "ygo.card.name.SET";

interface SetNameAction
{
	type: typeof SET;
	payload: Name;
}

export function set(value: string): SetNameAction
{
	return { type: SET, payload: value };
}

export type ActionTypes = SetNameAction;
