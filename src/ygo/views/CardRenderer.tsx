import * as React from "react";

import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CardType } from "../models";

export default function CardRenderer(): JSX.Element
{
	const card = useSelector<CardType, CardType>(card=> card);

	const render = React.useCallback(function(canvas: HTMLCanvasElement | null)
	{
		if (!canvas){ return; }
		
		const ctx = canvas.getContext("2d");
		if (!ctx){ return; }

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(card.name, 0, 16);
		ctx.fillText(card.serialNumber, 0, 320);
		ctx.fillText(card.effect, 0, 48);

		for (let level=0; level<card.level.value; ++level)
		{
			ctx.beginPath()
			ctx.ellipse(level * 10, 32, 5, 5, 0, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();
		}
	}, [card]);

	return <Card>
		<CardActionArea>
			<CardMedia 
				component="canvas"
				width={420}
				height={610}
				ref={render}
			/>
		</CardActionArea>
		<CardActions>
			<Button size="small" color="primary">Upload</Button>
			<Button size="small" color="primary">Save</Button>
		</CardActions>
		</Card>;
}
