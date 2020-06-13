import { Rarity } from "./type";
import { ActionTypes } from "./actions";

import { ID as SET } from "./actions/Set";

const initialValue: Rarity = Rarity.Common;

export default function RarityReducer(
	state: Rarity = initialValue,
	action: ActionTypes
): Rarity
{
	switch(action.type)
	{
		case SET:
			return action.payload;
	}
	return state;
}