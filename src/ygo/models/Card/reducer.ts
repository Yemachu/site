import { combineReducers } from "redux";

import { reducer as AttributeReducer } from "../Attribute";
import { reducer as NameReducer } from "../Name";
import { reducer as LevelReducer } from "../Level";
import { reducer as PendulumReducer } from "../Pendulum";
import { reducer as SerialNumberReducer } from "../SerialNumber";
import { reducer as LinkReducer } from "../Link";

import Card from "./type";

const reducer = combineReducers<Card>({
	attribute: AttributeReducer,
	name: NameReducer,
	level: LevelReducer,
	pendulum: PendulumReducer,
	serialNumber: SerialNumberReducer,
	link: LinkReducer,
});

export default reducer;