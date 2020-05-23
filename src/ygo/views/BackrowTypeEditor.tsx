import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Grid,
	Radio,
	FormControlLabel,
	TextField,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	MenuItem,
	Divider,

} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

function stopPropagation(e: React.MouseEvent | React.FocusEvent): void {
	e.stopPropagation();
}

export default function BackrowTypeEditor(): JSX.Element 
{
	const dispatch = useDispatch();
	const value = useSelector(state => state);

	return React.useMemo(function () {
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={stopPropagation}
					onFocus={stopPropagation}
					control={<Radio />}
					label="Backrow type"
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Autocomplete
							options={["Spell Card", "Trap Card"]}
							freeSolo
							renderInput={(params) => <TextField {...params} label="Type" variant="outlined" size="small" />}
						/>

					</Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							variant="outlined"
							label="Icon"
							size="small"
							select
							InputLabelProps={{shrink: true}}
						>
							<MenuItem value={0}>None</MenuItem>
							<Divider component="li" />
							<MenuItem value={1}>Continuous</MenuItem>
						</TextField>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>


	}, [value, dispatch]);

}
