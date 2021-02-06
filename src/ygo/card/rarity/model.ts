import { createReducer } from "typesafe-actions";

import { set } from "./actions";
import { Rarity } from "./type";

export const rarity = createReducer(Rarity.COMMON)
.handleAction(set, (state, action) => action.payload);