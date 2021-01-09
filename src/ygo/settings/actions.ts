import { createAction, ActionType } from "typesafe-actions";

export const open = createAction(
  "@ygo/settings/OPEN"
)();
export const close = createAction(
  "@ygo/settings/CLOSE"
)();

export type RootAction = 
| ActionType<typeof open>
| ActionType<typeof close>
;