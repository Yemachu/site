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

} from "@material-ui/core";

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
					<Grid item xs={12}>
						<TextField
							fullWidth
						/>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>


	}, [value, dispatch]);

}
