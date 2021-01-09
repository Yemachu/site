import React from "react";
import { Grid } from "@material-ui/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useSelector, createSelectorHook } from "react-redux";

import { ErrorBoundary } from "../utils";
import { Renderer } from "./render";
import { CardEditor } from "./card";

import { state as AppState } from "./model";

const Fallback = (): JSX.Element =>
{
  return <>
  </>
}

const render = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) { return; }
  const ctx = canvas.getContext("2d");
  if (!ctx) { return; }

  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillText(Date.now().toString(), 0, 16);
}

export const YgoCardMaker = (): JSX.Element =>
{
  const state = useSelector<any, ReturnType<typeof AppState>>(state => state);
  return <Grid container>
    <Grid item xs={12} md={6} style={{overflow: "auto"}}>
      <ErrorBoundary fallback={<Fallback/>}>
        <Renderer render={render} width={420} height={610} state={state.cards[state.selected]}/>
        {/*<SyntaxHighlighter language="json">
          {JSON.stringify(state, undefined, "  ")}
</SyntaxHighlighter>*/}
      </ErrorBoundary>
    </Grid>
    <Grid item xs={12} md={6}>
      <ErrorBoundary>
        <CardEditor card={state.selected ? state.cards[state.selected] : undefined} />
      </ErrorBoundary>
    </Grid>
  </Grid>
  
}