import Type from "./type";
import { 
	ENABLE,
	DISABLE,
	SET_BLUE,
	SET_RED,
	ActionTypes,
} from "./actions";

const inialValue: Type = {
	blueScale: "",
	redScale: "",
	effect: "",
	enabled: false,
};

export default function (
	state: Type = inialValue,
	action: ActionTypes
): Type
{
	switch(action.type)
	{
		case ENABLE:
			return { ...state, enabled: true };
		case DISABLE:
			return { ...state, enabled: false};
		case SET_RED:
			return { ...state, redScale: action.payload };
		case SET_BLUE:
			return { ...state, blueScale: action.payload };
	}
	return state;
}