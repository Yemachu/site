import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { MonsterType } from "../models";
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	MenuItem,
	Select,
	Typography,

} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

interface MonsterTypeProvider
{
	readonly monsterType: MonsterType;
}

export default function MonsterTypeEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<MonsterTypeProvider, MonsterType>(state => state.monsterType);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Monster type</Typography>
			</ExpansionPanelSummary>

			<ExpansionPanelDetails>
				<Select defaultValue={0}>
				<MenuItem value={0}>Dragon</MenuItem>
				<MenuItem value={1}>Wyrm</MenuItem>
				</Select>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	}, [value, dispatch]);

}
