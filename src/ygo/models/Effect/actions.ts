import { Effect } from "./type";

export const SET = "ygo.card.effect.SET";

interface SetEffectAction
{
	type: typeof SET;
	payload: Effect;
}

export function set(value: string): SetEffectAction
{
	return { type: SET, payload: value };
}

export type ActionTypes = SetEffectAction;
