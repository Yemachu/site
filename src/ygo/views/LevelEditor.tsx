import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Slider,
	Grid,
	Radio,
	Checkbox,
	Tooltip,

	FormControlLabel,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from "@material-ui/core";

import {
	SwapHorizontalCircle as FlipIcon,
	SwapHorizontalCircleOutlined as FlipIconUnchecked,
	ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

import { Card, Level } from "../models";
import * as actions from "../models/Level/actions";


function stopPropagation(e: React.MouseEvent | React.FocusEvent): void
{
	e.stopPropagation();
}

export default function LevelEditor()
{
	const dispatch = useDispatch();
	const value = useSelector<Card, Level>(state => state.level);

	return React.useMemo(function()
	{
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={stopPropagation}
					onFocus={stopPropagation}
					control={<Radio/>}
					label="Level"
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>

					<Grid item xs={12}>
						<Slider
							value={value.value}
							min={0}
							max={12}
							onChange={(_, value) => { dispatch(actions.set(value)); }}
							marks
							valueLabelDisplay="auto" />
					</Grid>
					<Grid item>
						<Tooltip title="Flip level">
							<Checkbox 
								checkedIcon={<FlipIcon />} 
								icon={<FlipIconUnchecked />}
								checked={value.mirrored} 
								onChange={() => { dispatch(actions.mirror()); }}
								/>
						</Tooltip>
					</Grid>
				</Grid>

			</ExpansionPanelDetails>
		</ExpansionPanel>

	}, [value, dispatch]);
}
