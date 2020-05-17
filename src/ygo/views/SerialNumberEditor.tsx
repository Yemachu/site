import * as React from "react";

import { 
	useDispatch,
	useSelector,

} from "react-redux";

import {
	TextField,
	InputAdornment,
	IconButton,
	Tooltip,

} from "@material-ui/core";

import {
	Casino as RandomIcon,

} from "@material-ui/icons";

import {
	Card,
	SerialNumber, 
} from "../models";

import * as actions from "../models/SerialNumber/actions";

export default function SerialNumberEditor(): JSX.Element
{
	const value = useSelector<Card, SerialNumber>(state=>state.serialNumber);
	const dispatch = useDispatch();

	return React.useMemo(function(){
		return <TextField 
			value={value}
			label="Serial number"
			InputLabelProps={{shrink: true}}
			onChange={(evt)=>{
				dispatch(actions.set(evt.target.value));
			}}
			InputProps={{
				endAdornment: <InputAdornment position="end">
					<Tooltip title="Randomize">
						<IconButton 
							onClick={()=>{dispatch(actions.randomize());}}
						>
							<RandomIcon/>
						</IconButton>
					</Tooltip>
				</InputAdornment>
			}}
			fullWidth
		/>
	}, [value, dispatch]);

}