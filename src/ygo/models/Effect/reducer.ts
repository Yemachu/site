import { Effect } from "./type";
import { ActionTypes, SET } from "./actions";

const initialState: Effect = "";

export default function EffectReducer(
	state = initialState,
	action: ActionTypes
): Effect
{
	switch(action.type)
	{
	case SET:
		return action.payload;

	default:
		return state;
	}
}
