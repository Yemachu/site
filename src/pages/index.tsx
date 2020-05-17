import * as React from "react";

import { 
	Router,
} from "@reach/router";

import { withPrefix } from "gatsby";

import {
	ErrorBoundary,
	Route,

}from "../utils";

import Routes, { NotFound } from "../routes";

import { Standard as Layout } from "../layouts";
import { Button } from "@material-ui/core";

interface Props
{
	location: Location;
}

function Fallback(_: Error, reset: () => void): JSX.Element
{
	return <React.Fragment>
		Error with the card maker.
		<Button onClick={reset}  variant="outlined">Reset</Button>
	</React.Fragment>
}

export default function Index({location}: Props): JSX.Element {
	const routes = React.useMemo(function()
	{
		return Routes.map(function(route)
		{
			return <Route 
				key={route.key}
				path={withPrefix(route.path)} 
				component={route.component} 
			/>;
		});
	}, [Routes]);

	return <Layout routes={Routes} location={location}>
		<ErrorBoundary fallback={Fallback}>
			<Router>
				{routes}
				<Route default component={NotFound} />
			</Router>
		</ErrorBoundary>
	</Layout>;
}