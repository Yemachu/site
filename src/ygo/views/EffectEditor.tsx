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
	ButtonGroup,
	Button,
	Tooltip,
	Grid,

} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

const specialCharacters: readonly string[] = [
	"•",
	"∞"
];

export default function EffectEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<Card, Effect>(state => state.effect);
	const ref = React.useRef<HTMLInputElement>();

	const Buttons = React.useMemo(function() {
		return specialCharacters.map(c => {
			return <Button
				key={c}
				onClick={() => {}}
			>{c}</Button>
		})

	}, specialCharacters);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Effect</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextField
						value={value}
						inputRef={ref}
						onChange={(evt)=>{dispatch(actions.set(evt.target.value));}}
						multiline
						fullWidth
						size="small"
						variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} alignContent="center">
						<ButtonGroup variant="contained" size="small" color="secondary">
							{Buttons}
						</ButtonGroup>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	}, [value, dispatch]);
}
