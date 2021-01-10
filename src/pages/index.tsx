import * as React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux"; 

import { Link, withPrefix } from "gatsby";

import {
	ErrorBoundary,

}from "../utils";

import { StandardLayout } from "../layouts/Standard";
import { Button } from "@material-ui/core";

interface Props
{
	location: Location;
}

function Fallback(): JSX.Element
{
	return <React.Fragment>
		Error with the card maker.
	</React.Fragment>
}

const store = createStore(() => 0); 

export default function Index({location}: Props): JSX.Element {
	
	return <Provider store={store}>
		<StandardLayout>
			<ErrorBoundary fallback={<Fallback />}>
				
			</ErrorBoundary>
		</StandardLayout>;
	</Provider>
}