import { createReducer } from "typesafe-actions";

import { add, reorder, remove, select } from "./actions";
import { card, Card, actions } from "../card";

export type Project = {
  readonly cards: Readonly<{ [id: string]: Card }>;
  readonly order: string[];
  readonly selected?: string;
}

const defaultProject: Project = {
  cards: {},
  order: [],
  selected: undefined,
}

export const project = createReducer<Project>(defaultProject)
.handleAction(add, (state, action) => {
  const newCard = card(action.payload, action);
  return { 
    ...state, 
    cards: { ...state.cards, [action.meta.id]: newCard },
    order: [ ...state.order, action.meta.id ],
    selected: action.meta.id,
  };
})
.handleAction(reorder, (state, action) => {
  const {payload:{from, to}} = action;
  const clone = [...state.order];
  clone.splice(from, 1);
  clone.splice(to, 0, state.order[from]);
  return { ...state, order: clone };
})
.handleAction(remove, (state, action) => {
  const { [action.meta.id]: removed, ...rest } = state.cards;
  return {
    ...state,
    order: state.order.filter(id => id !== action.meta.id),
    cards: rest,
    selected: action.meta.id !== state.selected ? state.selected : undefined,
  };
})
.handleAction(select, (state, action) => {
  const id = action.meta.id;
  const exists: boolean = state.cards[id] !== undefined;
  return {
    ...state,
    selected: exists ? id : undefined
  };
})
.handleAction(actions.all, (state, action) => {
  if (!state.selected) { return state }
  // TODO: Make sure the selected card actually exists.
  return {
    ...state,
    cards: {...state.cards, [state.selected]: card(state.cards[state.selected], action)}
  }
})
;
