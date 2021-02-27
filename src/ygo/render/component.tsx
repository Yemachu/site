import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardActions, CardMedia } from "@material-ui/core";
import { upload } from "../upload/actions";
import { saveAs } from "file-saver";

export type RendererProps<T, U> = {
  readonly width: number;
  readonly height: number;
  readonly render: (canvas: HTMLCanvasElement | null, state: T, resources: U) => void;
  readonly state: T;
  readonly resources: U;
}

export const Renderer = <T extends unknown>(props: RendererProps<T>) =>
{
  const {
    width,
    height,
    render,
    state,
    resources,
  } = props;
  const dispatch = useDispatch();

  const ref = useCallback((canvas)=>render(canvas, state, resources), [render, state, resources]);

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
          render(canvas, state, resources);
          dispatch(upload(canvas.toDataURL(), "Identifier"));
        }}
      >
        Upload
      </Button>
      <Button onClick={()=>{
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        render(canvas, state, resources);
        canvas.toBlob(blob => blob && saveAs(blob, "Image.png"), "image/png");
      }}>
        Save
      </Button>
    </CardActions>
  </Card>

}