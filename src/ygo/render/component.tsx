import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardActions, CardMedia } from "@material-ui/core";
import { upload } from "../upload/actions";

export type RendererProps<T> = {
  readonly width: number;
  readonly height: number;
  readonly render: (canvas: HTMLCanvasElement | null, state: T) => void;
  readonly state: T;
}

export const Renderer = <T extends unknown>(props: RendererProps<T>) =>
{
  const {
    width,
    height,
    render,
    state,
  } = props;
  const dispatch = useDispatch();

  const ref = useCallback((canvas)=>render(canvas, state), [render, state]);

  return <Card>
    <CardMedia 
      component="canvas" 
      width={width} 
      height={height} 
      innerRef={ref} 
      style={{ 
        maxWidth: "100%" /* Prevent clipping */, 
        margin: "0 auto" /* Center the image horizontally*/ 
      }} 
    />
    <CardActions>
      <Button 
        onClick={()=>{
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          render(canvas, state);
          dispatch(upload(canvas.toDataURL(), "Identifier"));
        }}
      >
        Upload
      </Button>
    </CardActions>
  </Card>

}