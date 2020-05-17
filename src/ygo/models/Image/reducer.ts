import { Image } from "./type"
import { ActionTypes, SET_IMAGE} from "./actions";

const initialState: Image = {
	url: "",
	region: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	}
}

export default function ImageReducer(
	state: Image = initialState,
	action: ActionTypes
): Image
{
	switch(action.type)
	{
		case SET_IMAGE:
			return { ...state, url: action.payload };
		default:
			return state;
	}
}