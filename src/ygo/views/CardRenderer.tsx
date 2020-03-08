import * as React from "react";

interface Props
{

}

export default function CardRenderer({}: Props)
{
	const render = React.useCallback(function(canvas: HTMLCanvasElement | null)
	{
		const ctx = canvas?.getContext("2d");
		if (!ctx){ return; }

		ctx.fillText("Rendered a card.", 0, 16);
	}, []);

	return <canvas width={420} height={610} ref={render} />;
}
