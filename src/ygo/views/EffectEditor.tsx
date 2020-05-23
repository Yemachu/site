import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Effect } from "../models";
import * as actions from "../models/Effect/actions";

import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	TextField,
	Typography,

} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

export default function EffectEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<Card, Effect>(state => state.effect);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Effect</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<TextField
				value={value}
				onChange={(evt)=>{dispatch(actions.set(evt.target.value));}}
				multiline
				fullWidth
				size="small"
				variant="outlined"
				/>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	}, [value, dispatch]);
}
