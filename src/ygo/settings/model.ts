import { createReducer } from "typesafe-actions";

import { open, close } from "./actions";

export const settings = createReducer({})
.handleAction(open, (state, action) => state)
.handleAction(close, (state, action) => state)
;