import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardActions, CardMedia } from "@material-ui/core";
import { upload } from "../upload/actions";

export type RendererProps = {
  readonly width: number;
  readonly height: number;
  readonly render: (canvas: HTMLCanvasElement | null) => void;
  readonly state: unknown;
}

export const Renderer = (props: RendererProps) =>
{
  const {
    width,
    height,
    render,
    state,
  } = props;
  const dispatch = useDispatch();

  const ref = useCallback((canvas)=>render(canvas), [render, state]);

  return <Card>
    <CardMedia component="canvas" width={width} height={height} innerRef={ref} />
    <CardActions>
      <Button onClick={()=>{dispatch(upload("Identifier"))}}>Upload</Button>
    </CardActions>
  </Card>

}