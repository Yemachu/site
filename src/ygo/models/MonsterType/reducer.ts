import MonsterType from "./type";
import { ActionTypes } from "./actions";

import { ID as ADD} from "./actions/Add";
import { ID as DISABLE} from "./actions/Disable";
import { ID as ENABLE } from "./actions/Enable";
import { ID as REMOVE } from "./actions/Remove";
import { ID as RESET} from "./actions/Reset";

const initialValue: MonsterType = {
	enabled: true,
};

export default function MonsterTypeReducer(
	state: MonsterType = initialValue,
	action: ActionTypes
): MonsterType
{
	switch(action.type)
	{
		case ADD:
			break;
		case DISABLE: 
			return {...state, enabled: false};
		case ENABLE:
			return {...state, enabled: true};
		case REMOVE:
			break;
		case RESET:
			return initialValue;
	}

	return state;
}