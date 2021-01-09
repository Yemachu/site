import { ActionType, createAction } from "typesafe-actions";

import { Card } from "../card";

export const reorder = createAction(
  "@ygo/project/REORDER", 
  (from: number, to: number) => ({ from, to })
)();

export const add = createAction(
  "@ygo/project/ADD",
  (_, card?: Card) => card,
  (id: string) => ({ id })
)();

export const select = createAction(
  "@ygo/project/SELECT",
  undefined,
  (id: string) => ({ id })
)();

export const update = createAction(
  "@ygo/project/UPDATE",
  (_, card: Card) => (card),
  (id: string) => ({ id }),
)();

export const remove = createAction(
  "@ygo/project/REMOVE",
  undefined,
  (id: string) => ({ id })
)();

export type Actions = 
| ActionType<typeof reorder>
| ActionType<typeof add>
| ActionType<typeof select>
| ActionType<typeof update>
| ActionType<typeof remove>
;