
import { AllowedValues, Level, Variant, MIN_VALUE, MAX_VALUE } from "./type";
import { ActionTypes, SET_LEVEL, INCREMENT, DECREMENT, MIRROR } from "./actions";

const initialState: Level = { 
	value: 0, 
	variant: Variant.DEFAULT,
	mirrored: false,
};

export default function LevelReducer(
	state = initialState,
	action: ActionTypes
): Level {
	switch (action.type) {

		case SET_LEVEL:
			return {
				...state,
				value: action.payload
			}
			
		case INCREMENT:
			return {
				...state,
				value: Math.min(state.value + 1, MAX_VALUE) as AllowedValues
			};

		case DECREMENT:
			return {
				...state,
				value: Math.max(state.value -1, MIN_VALUE) as AllowedValues
			};

		case MIRROR:
			return {
				...state,
				mirrored: !state.mirrored
			}

		default:
			return state;
	}
}
