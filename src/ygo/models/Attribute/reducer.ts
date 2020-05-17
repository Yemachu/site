
import Attribute from "./type";
import { ActionTypes, SET } from "./actions";

const initialState: Attribute = Attribute.NONE;
export default function AttributeReducer(
	state = initialState,
	action: ActionTypes
): Attribute
{
	switch(action.type)
	{
		case SET:
			return action.payload;
		default:
			return state;
	}
}
