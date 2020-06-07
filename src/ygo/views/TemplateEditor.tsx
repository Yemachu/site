import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, MenuItem, Divider, } from "@material-ui/core";

export default function TemplateEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector(()=>null);

	return React.useMemo(function()
	{
		return <TextField
			fullWidth
			InputLabelProps={{shrink: true}}
			label="Template"
			select
			size="small"
			variant="outlined"
		>
			<MenuItem>Normal</MenuItem>
			<MenuItem>Effect</MenuItem>
			<MenuItem>Ritual</MenuItem>
			<Divider component="li" />
			<MenuItem>Fusion</MenuItem>
			<MenuItem>Synchro</MenuItem>
			<MenuItem>Xyz</MenuItem>
			<MenuItem>Link</MenuItem>
			<Divider component="li" />
			<MenuItem>Spell</MenuItem>
			<MenuItem>Trap</MenuItem>
			<Divider component="li" />
			<MenuItem>Token</MenuItem>
			<MenuItem></MenuItem>
		</TextField>

	}, [dispatch, value]);
}