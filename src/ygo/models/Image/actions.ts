import {  } from "./type";

export const SET_IMAGE = "ygo.card.image.SET";

interface SetAction {
	type: typeof SET_IMAGE;
	payload: string;
}

export function set(value: string): SetAction {
	return { type: SET_IMAGE, payload: value };
}

export type ActionTypes =
	| SetAction
	;
