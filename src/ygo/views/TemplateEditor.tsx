import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Type as Template, actions } from "../models/Template";

import { TextField, MenuItem, Divider, } from "@material-ui/core";

interface TemplateProvider
{
	readonly template: Template;
}

export default function TemplateEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector((provider: TemplateProvider)=>provider.template);

	return React.useMemo(function()
	{
		return <TextField
			fullWidth
			InputLabelProps={{shrink: true}}
			label="Template"
			value={value}
			onChange={(evt) => { dispatch(actions.set(evt.target.value as Template)); }}
			select
			size="small"
			variant="outlined"
		>
			<MenuItem value={Template.NORMAL}>Normal</MenuItem>
			<MenuItem value={Template.EFFECT}>Effect</MenuItem>
			<MenuItem value={Template.RITUAL}>Ritual</MenuItem>
			<Divider component="li" />
			<MenuItem value={Template.FUSION}>Fusion</MenuItem>
			<MenuItem value={Template.SYNCHRO}>Synchro</MenuItem>
			<MenuItem value={Template.XYZ}>Xyz</MenuItem>
			<MenuItem value={Template.LINK}>Link</MenuItem>
			<Divider component="li" />
			<MenuItem value={Template.SPELL}>Spell</MenuItem>
			<MenuItem value={Template.TRAP}>Trap</MenuItem>
			<Divider component="li" />
			<MenuItem value={Template.TOKEN}>Token</MenuItem>
		</TextField>

	}, [dispatch, value]);
}