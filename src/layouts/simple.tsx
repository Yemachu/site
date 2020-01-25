import * as React from "react";
import { useStaticQuery, graphql } from "gatsby"

export default function(props:React.ComponentProps<"div">)
{
	return <React.Fragment>
		{props.children}
	</React.Fragment>
}