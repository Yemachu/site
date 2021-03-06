import * as React from "react";

import { Card, CardActionArea, CardActions, CardMedia, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Card as CardType } from "../models";
import { saveAs } from "file-saver";

import { render } from "../services/CardRenderer";
import { useCancel } from "../../utils";

export default function CardRenderer(): JSX.Element
{
	const card = useSelector<CardType, CardType>(card=> card);

	const r = React.useCallback(function(canvas: HTMLCanvasElement | null)
	{
		const [token, cancel] = useCancel();
		render(canvas, card, token);
		return cancel;
	}, [card]);

	return <Card>
		<CardActionArea>
			<CardMedia 
				component="canvas"
				width={420}
				height={610}
				style={{maxWidth: "100%", margin: "0 auto"}}
				ref={r}
			/>
		</CardActionArea>
		<CardActions>
			<Button size="small" color="primary">Upload</Button>
			<Button size="small" color="primary" onClick={async ()=>{
				const canvas = document.createElement("canvas");
				canvas.width = 420;
				canvas.height = 610;
				const [token] = useCancel();
				await render(canvas, card, token);
				canvas.toBlob((blob) => { 
					if (blob) { saveAs(blob, (card.name.replace(/[^A-Za-z0-9\-_ ]/g, "") || "Card") + ".png");}
				});
			}}>Save</Button>
		</CardActions>
		</Card>;
}
