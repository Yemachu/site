import * as React from "react";

import {
	Typography
	
} from "@material-ui/core";

export default function Home()
{
	return React.useMemo(function()
	{
		return <React.Fragment>
			<Typography variant="h2">
				What's new?
			</Typography>
			<Typography>
				
			</Typography>
		</React.Fragment>;
	}, []);
}