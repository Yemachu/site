import { createReducer } from "typesafe-actions";

import { set } from "./actions";
import { Attribute } from "./type";

export const attribute = createReducer(Attribute.NONE)
.handleAction(set, (state, action) => action.payload)
;