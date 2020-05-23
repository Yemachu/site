import { Region } from "./type";

export const SET_IMAGE = "ygo.card.image.SET";
export const CROP = "ygo.card.image.CROP";

interface SetAction {
	type: typeof SET_IMAGE;
	payload: string;
}

export function set(value: string): SetAction {
	return { type: SET_IMAGE, payload: value };
}

interface CropAction {
	type: typeof CROP;
	payload: Region;
}

export function crop(value: Region): CropAction
{
	return { type: CROP, payload: {...value} };
}

export type ActionTypes =
	| SetAction
	| CropAction
	;
