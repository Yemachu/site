import { combineReducers } from "redux";

import { reducer as AttributeReducer } from "../Attribute";
import { reducer as EffectReducer } from "../Effect";
import { reducer as ImageReducer } from "../Image";
import { reducer as LevelReducer } from "../Level";
import { reducer as LinkReducer } from "../Link";
import { reducer as MonsterTypeReducer } from "../MonsterType";
import { reducer as NameReducer } from "../Name";
import { reducer as PendulumReducer } from "../Pendulum";
import { reducer as SerialNumberReducer } from "../SerialNumber";

import Card from "./type";

const reducer = combineReducers<Card>({
	attribute: AttributeReducer,
	effect: EffectReducer,
	image: ImageReducer,
	level: LevelReducer,
	link: LinkReducer,
	monsterType: MonsterTypeReducer,
	name: NameReducer,
	pendulum: PendulumReducer,
	serialNumber: SerialNumberReducer,
});

export default reducer;
