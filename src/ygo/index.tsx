import * as React from "react";

import { Grid } from "@material-ui/core";
import { CardRenderer } from "./views";

export default function YuGiOh()
{
	return <Grid container spacing={1}>
		<Grid item xs={12} sm={6} md={12} lg={6}>
			<CardRenderer />
		</Grid>

		<Grid item xs={12} sm={6} md={12} lg={6}>
			Yu-Gi-Oh! Card maker.
		</Grid>
	</Grid>
}
