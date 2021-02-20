import { createReducer } from "typesafe-actions";
import { set } from "./actions";
import { Template } from "./type";

export const template = createReducer(Template.NORMAL)
.handleAction(set, (state, action) => action.payload)
;