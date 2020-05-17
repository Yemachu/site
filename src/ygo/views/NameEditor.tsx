import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@material-ui/core";

import { Card, Name } from "../models";
import * as actions from "../models/Name/actions";

export default function NameEditor()
{
	const dispatch = useDispatch();
	const value = useSelector<Card, Name>(state => state.name);

	return React.useMemo(function() {
		return <TextField
			value={value}
			onChange={(evt)=>{dispatch(actions.set(evt.target.value));}}
			label="Name"
			InputLabelProps={{shrink: true}}
			fullWidth
		/>;
	}, [value, dispatch]);
}