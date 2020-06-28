import { Template } from "../type";
export const ID = "ygo.card.template.SET";

export interface SetAction {
	type: typeof ID;
	readonly template: Template;
}

export function set(template: Template): SetAction {
	return { type: ID, template }
}