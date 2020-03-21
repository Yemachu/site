
import Name from "./type";
import { ActionTypes, SET } from "./actions";

const initialState: Name = "";

export default function AttributeReducer(
	state = initialState,
	action: ActionTypes
): Name
{
	switch(action.type)
	{
	case SET:
		return action.payload;
		
	default:
		return state;
	}
}
