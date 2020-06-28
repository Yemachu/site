import { combineReducers } from "redux";

import { reducer as AttributeReducer } from "../Attribute";
import { reducer as EffectReducer } from "../Effect";
import { reducer as ImageReducer } from "../Image";
import { reducer as LevelReducer } from "../Level";
import { reducer as LinkReducer } from "../Link";
import { reducer as MonsterTypeReducer } from "../MonsterType";
import { reducer as NameReducer } from "../Name";
import { reducer as PendulumReducer } from "../Pendulum";
import { reducer as RarityReducer } from "../Rarity";
import { reducer as SerialNumberReducer } from "../SerialNumber";
import { reducer as TemplateReducer } from "../Template";

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
	rarity: RarityReducer,
	serialNumber: SerialNumberReducer,
	template: TemplateReducer,
});

export default reducer;
