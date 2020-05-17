import { SerialNumber } from "./type";

import { ActionTypes, SET, RANDOMIZE, ILLEGALIZE } from "./actions";

const initialValue: SerialNumber = "This card cannot be used in a Duel.";

export default function SerialNumberReducer(
	state: SerialNumber = initialValue,
	action: ActionTypes
): SerialNumber
{
	switch(action.type)
	{
	case SET:
		return action.value;

	case RANDOMIZE:
		return Math.floor(Math.random() * 10_000_000_000).toString().padStart(10, "0");
	
	case ILLEGALIZE:
		return "This card cannot be used in a Duel.";
	
	default:
		return state;
	}
}