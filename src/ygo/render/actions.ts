import { createAction, ActionType } from "typesafe-actions";

export const repaint = createAction("@ygo/renderer/REPAINT")();

export type Actions = 
| ActionType<typeof repaint>
;