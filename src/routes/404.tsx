import * as React from "react";

import {
	Typography,

} from "@material-ui/core";

export default function Error_404()
{
	return React.useMemo(function()
	{
		return <React.Fragment>
			<Typography variant="h2">
				It is not here
			</Typography>
			<Typography>
				
			</Typography>
		</React.Fragment>;
	}, []);
}