import React, { useEffect, useCallback } from "react";

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

  const ref = useCallback((canvas)=>render(canvas), [render, state]);

  return <canvas 
    width={width}
    height={height}
    ref={ref} 
    />
}