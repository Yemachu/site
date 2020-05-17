import * as React from "react";
import { useDispatch, useSelector } from "react-redux";


import {
	Checkbox,
	Button,
	Tooltip,
	FormControlLabel,

	Divider,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,
} from "@material-ui/core";

import {
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";

import {
	useTranslation,
} from "react-i18next";

import { Card, Link } from "../models";
import * as actions from "../models/Link/actions";

function stopPropagation(e: React.MouseEvent | React.FocusEvent): void
{
	e.stopPropagation();
}

export default function LinkEditor(): JSX.Element
{
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const value = useSelector<Card, Link>(state => state.link);

	return React.useMemo(function(){
		function change(value:{[key:string]:boolean}): void
		{
			dispatch(actions.toggle());
		}

		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={stopPropagation}
					onFocus={stopPropagation}
					control={<Checkbox/>}
					label="Link"
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>

				<table>
					<tbody>
						<tr>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.top-left", { defaultValue: "North-west" })}>
									<Checkbox checked={value.topLeft} onChange={(evt, newValue)=>{
										change({topLeft: newValue});
									}} />
								</Tooltip>
							</td>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.top-center", { defaultValue: "North" })}>
									<Checkbox checked={value.topCenter} onChange={(evt, newValue) => {
										change({ topCenter: newValue });
									}} />
								</Tooltip>
							</td>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.top-right", { defaultValue: "North-east" })}>
									<Checkbox checked={value.topRight} onChange={(evt, newValue) => {
										change({ topRight: newValue });
									}} />
								</Tooltip>
							</td>
						</tr>

						<tr>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.middle-left", { defaultValue: "West" })}>
									<Checkbox checked={value.middleLeft} onChange={(evt, newValue) => {
										change({ middleLeft: newValue });
									}} />
								</Tooltip>
							</td>
							<td>{/* Specifically empty */}</td>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.middle-right", { defaultValue: "East" })}>
									<Checkbox checked={value.middleRight} onChange={(evt, newValue) => {
										change({ middleRight: newValue });
									}} />
								</Tooltip>
							</td>
						</tr>

						<tr>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.bottom-left", { defaultValue: "South-west" })}>
									<Checkbox checked={value.bottomLeft} onChange={(evt, newValue) => {
										change({ bottomLeft: newValue });
									}} />
								</Tooltip>
							</td>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.bottom-center", { defaultValue: "South" })}>
									<Checkbox checked={value.bottomCenter} onChange={(evt, newValue) => {
										change({ bottomCenter: newValue });
									}} />
								</Tooltip>
							</td>
							<td>
								<Tooltip title={t("ygo:ui.pendulum.bottom-right", { defaultValue: "South-east" })}>
									<Checkbox checked={value.bottomRight} onChange={(evt, newValue) => {
										change({ bottomRight: newValue });
									}} />
								</Tooltip>
							</td>
						</tr>
					</tbody>
				</table>
			</ExpansionPanelDetails>
			<Divider />
			<ExpansionPanelActions>
				<Button onClick={()=>{dispatch(actions.invert());}}>Invert</Button>
				<Button onClick={()=>{dispatch(actions.clearAll());}}>Clear</Button>

			</ExpansionPanelActions>
		</ExpansionPanel>
		
	}, [value, dispatch]);
}