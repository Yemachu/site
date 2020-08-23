import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,

} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

import { Type as Pendulum, actions } from "../models/Pendulum";

function stopPropagation(e: React.MouseEvent | React.FocusEvent): void
{
	e.stopPropagation();
}

interface PendulumProvider
{
	readonly pendulum: Pendulum;
}


export default function PendulumEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<PendulumProvider, Pendulum>(state => state.pendulum);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={stopPropagation}
					onFocus={stopPropagation}
					control={<Checkbox
						checked={value.enabled}
						onChange={(evt) => {
							dispatch(evt.target.checked ? actions.enable() : actions.disable());
						}}
					/>}
					label="Pendulum"
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
						value={0}
						onChange={(evt)=>{/*dispatch(actions.);*/}}
						fullWidth
						size="small"
						variant="outlined"
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
						value={0}
						onChange={(evt) => {/* dispatch(actions.);*/}}
						fullWidth 
						size="small"
						variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							onChange={(evt) => {/* dispatch(actions.);*/}}
							multiline
							fullWidth
							size="small"
							variant="outlined"
							/>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>


	}, [value, dispatch]);

}
