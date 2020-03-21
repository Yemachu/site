import * as React from "react";
import { useSelector } from "react-redux";
import { Card, SerialNumber } from "../models";

interface Props
{

}

export default function CardRenderer({}: Props)
{
	const serialNumber = useSelector<Card, SerialNumber>(card=> card.serialNumber);

	const render = React.useCallback(function(canvas: HTMLCanvasElement | null)
	{
		if (!canvas){ return; }
		
		const ctx = canvas.getContext("2d");
		if (!ctx){ return; }

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText("Rendered a card.", 0, 16);
		ctx.fillText(serialNumber, 0, 32);
	}, [serialNumber]);

	return <canvas
		width={420}
		height={610}
		style={{
			maxWidth: "100%"
		}}
		ref={render}
	/>;
}
