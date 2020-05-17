import { Attribute } from "./type";

export const SET = "ygo.card.attribute.SET";

interface SetAttributeAction {
	type: typeof SET;
	payload: Attribute;
}

export function set(value: Attribute): SetAttributeAction {
	return { type: SET, payload: value };
}

export type ActionTypes = 
	| SetAttributeAction
	;
