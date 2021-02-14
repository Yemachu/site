import React from "react";
import { Grid, Box } from "@material-ui/core";
import { useSelector } from "react-redux";

import { ErrorBoundary, useFallbackContext } from "../utils";
import { Renderer } from "./render";
import { CardEditor, Card } from "./card";

import { state as AppState } from "./model";

import { render as text} from "./render/render";

const Fallback = (): JSX.Element =>
{
  const { error } = useFallbackContext();
  return <>
    {error.message}
  </>
}

const render = (canvas: HTMLCanvasElement | null, card?: Card) => {
  if (!canvas) { return; }
  const ctx = canvas.getContext("2d");
  if (!ctx) { return; }

  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (!card) return;

  text(ctx, card.name);
}

export const YgoCardMaker = (): JSX.Element =>
{
  const state = useSelector<any, ReturnType<typeof AppState>>(state => state);
  return <Box p={2}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} style={{overflow: "auto"}}>
        <ErrorBoundary fallback={<Fallback/>}>
          <Renderer render={render} width={420} height={610} state={state.cards[state?.selected||""]}/>
        </ErrorBoundary>
      </Grid>
      <Grid item xs={12} md={6}>
        <ErrorBoundary>
          <CardEditor card={state.selected ? state.cards[state.selected] : undefined} />
        </ErrorBoundary>
      </Grid>
    </Grid>
  </Box>  
}