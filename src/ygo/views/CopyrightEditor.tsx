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
	Copyright as CopyrightIcon,

} from "@material-ui/icons";

import {
	Copyright,
} from "../models";

import * as actions from "../models/SerialNumber/actions";

interface CopyrightProvider
{
	readonly copyright: Copyright;
}

export default function CopyrightEditor(): JSX.Element {
	const value = useSelector<CopyrightProvider, Copyright>(state => state.copyright);
	const dispatch = useDispatch();

	return React.useMemo(function () {
		return <TextField
			value={value}
			label="Serial number"
			InputLabelProps={{ shrink: true }}
			onChange={(evt) => {
				dispatch(actions.set(evt.target.value));
			}}
			InputProps={{
				endAdornment: <InputAdornment position="end">
					<Tooltip title="Randomize">
						<IconButton
							onClick={() => { dispatch(actions.randomize()); }}
							size="small"
							edge="end"
						>
							<CopyrightIcon />
						</IconButton>
					</Tooltip>
				</InputAdornment>
			}}
			fullWidth
			size="small"
			variant="outlined"
		/>
	}, [value, dispatch]);

}