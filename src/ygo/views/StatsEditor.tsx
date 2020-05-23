import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Grid,
	Checkbox,
	TextField,
	FormControlLabel,

} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

import * as actions from "../models/Name/actions";

interface StatsProvider
{
	readonly name: any;
}

export default function NameEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const [atk, def] = useSelector<StatsProvider, any>(state => [state.name, state.name]);

	return React.useMemo(function() {
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					label="Attack &amp; Defense"
					control={<Checkbox />}
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
						value={atk}
						onChange={(evt)=>{dispatch(actions.set(evt.target.value));}}
						label="Attack"
						InputLabelProps={{shrink: true}}
						fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
						value={def}
						onChange={(evt)=>{dispatch(actions.set(evt.target.value));}}
						label="Defense"
						InputLabelProps={{shrink: true}}
						fullWidth
						/>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>

	}, [atk, def, dispatch]);
}
