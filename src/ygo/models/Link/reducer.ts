import Link from "./type";
import { ActionTypes, CLEAR_ALL, INVERT, TOGGLE } from "./actions";

const initialState: Link = {
	topLeft: false,
	topCenter: false,
	topRight: false,
	middleLeft: false,
	middleRight: false,
	bottomLeft: false,
	bottomCenter: false,
	bottomRight: false,
}

export default function LinkReducer(
	state: Link = initialState,
	action: ActionTypes
): Link
{
	switch(action.type)
	{
	case CLEAR_ALL:
		return {
			topLeft: false,
			topCenter: false,
			topRight: false,
			middleLeft: false,
			middleRight: false,
			bottomLeft: false,
			bottomCenter: false,
			bottomRight: false,
		};

	case INVERT:
		return {
			topLeft:      !state.topLeft,
			topCenter:    !state.topCenter,
			topRight:     !state.topRight,
			middleLeft:   !state.middleRight,
			middleRight:  !state.middleRight,
			bottomLeft:   !state.bottomLeft,
			bottomCenter: !state.bottomCenter,
			bottomRight:  !state.bottomRight,
		}

	case TOGGLE:
		return {
			...state
		};
		
	default:
		return state;
	}
}