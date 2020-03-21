
import Level, { MIN_VALUE, MAX_VALUE } from "./type";
import { ActionTypes, SET_LEVEL, INCREMENT, DECREMENT } from "./actions";

const initialState: Level = 0;
export default function LevelReducer(
	state = initialState,
	action: ActionTypes
): Level {
	switch (action.type) {
		case SET_LEVEL:
			return action.payload;
			
		case INCREMENT:
			return Math.min(state +1, MAX_VALUE) as Level;

		case DECREMENT:
			return Math.max(state -1, MIN_VALUE) as Level;

		default:
			return state;
	}
}
