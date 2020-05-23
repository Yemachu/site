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

function stopPropagation(e: React.MouseEvent | React.FocusEvent): void
{
	e.stopPropagation();
}

export default function PendulumEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector(state => state);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={stopPropagation}
					onFocus={stopPropagation}
					control={<Checkbox/>}
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
