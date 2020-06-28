import { Template } from "./type";
import { ActionTypes } from "./actions";

import { ID as SET } from "./actions/Set";

const initialValue: Template = Template.NORMAL;

export default function MonsterTypeReducer(
	state: Template = initialValue,
	action: ActionTypes
): Template {
	switch (action.type) {
		case SET:
			return action.template;
	}

	return state;
}