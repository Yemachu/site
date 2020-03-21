export const CLEAR_ALL = "ygo.card.link.CLEAR_ALL";
export const INVERT = "ygo.card.link.INVERT";
export const TOGGLE = "ygo.card.link.TOGGLE";

interface ClearAllAction
{
	type: typeof CLEAR_ALL;
}

export function clearAll(): ClearAllAction
{
	return { type: CLEAR_ALL };
}

interface InvertAction
{
	type: typeof INVERT;
}

export function invert(): InvertAction
{
	return { type: INVERT };
}

interface ToggleAction
{
	type: typeof TOGGLE;
}

export function toggle(): ToggleAction
{
	return { type: TOGGLE };
}

export type ActionTypes = ClearAllAction | InvertAction | ToggleAction;