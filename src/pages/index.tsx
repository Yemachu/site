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

interface Props
{
	location: Location
}

export default function ({location}: Props) {
	console.log(location);
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
		<ErrorBoundary>
			<Router>
				{routes}
				<Route default component={NotFound} />
			</Router>
		</ErrorBoundary>
	</Layout>;
}