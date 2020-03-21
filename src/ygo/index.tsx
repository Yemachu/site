import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { Grid, Button, ButtonGroup } from "@material-ui/core";
import { CardRenderer } from "./views";
import { reducer } from "./models/Card";
import { randomize, illegalize } from "./models/SerialNumber/actions";

const store = createStore(reducer);
store.dispatch({type: ""});

export default function YuGiOh()
{

	return <Provider store={store}>
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={12} lg={6}>
				<CardRenderer />
			</Grid>

			<Grid item xs={12} sm={6} md={12} lg={6}>
				Yu-Gi-Oh! Card maker.
				<ButtonGroup>
					<Button onClick={()=>store.dispatch(randomize())}>Randomize</Button>
					<Button onClick={()=>store.dispatch(illegalize())}>Illegalize</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	</Provider>
}
