export const SET_BLUE = "ygo.card.pendulum.SET_BLUE";
export const SET_RED = "ygo.card.pendulum.SET_RED";
export const ENABLE = "ygo.card.pendulum.ENABLE";
export const DISABLE = "ygo.card.pendulum.DISABLE";

interface EnableAction {
	type: typeof ENABLE;
}

export function enable(): EnableAction
{
	return { type: ENABLE };
}


interface DisableAction {
	type: typeof DISABLE;
}

export function disable(): DisableAction
{
	return { type: DISABLE };
}

interface SetBlueAction {
	type: typeof SET_BLUE;
	payload: string;
}

export function setBlue(value: string): SetBlueAction {
	return { type: SET_BLUE, payload: value };
}

interface SetRedAction {
	type: typeof SET_RED;
	payload: string;
}

export function setRed(value: string): SetRedAction {
	return { type: SET_RED, payload: value };
}

export type ActionTypes =
	| DisableAction
	| EnableAction
	| SetBlueAction
	| SetRedAction
	;
