import { Image } from "./type"
import { ActionTypes, SET_IMAGE, CROP} from "./actions";

const initialState: Image = {
	url: "",
	region: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
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
		case CROP:
			return { ...state, region: action.payload };
		default:
			return state;
	}
}