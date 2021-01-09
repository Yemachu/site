import { createAction, ActionType } from "typesafe-actions";

export const upload = createAction(
  "@ygo/upload/UPLOAD",
  undefined,
  (id: string) => ({ id })
)();
export const abort = createAction(
  "@ygo/upload/ABORT",
  undefined,
  (id: string) => ({ id })
)();

export const started = createAction(
  "@ygo/upload/STARTED",
  undefined,
  (id: string) => ({ id})
)();

export const success = createAction(
  "@ygo/upload/SUCCESS",
  undefined,
  (id: string) => ({ id })
)();

export const failure = createAction(
  "@ygo/upload/FAILURE",
  undefined,
  (id: string) => ({ id })
)();

export type Actions =
| ActionType<typeof upload>
| ActionType<typeof abort>
| ActionType<typeof started>
| ActionType<typeof success>
| ActionType<typeof failure>
;