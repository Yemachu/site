import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { TextField, MenuItem } from "@material-ui/core";

import { Rarity } from "../models";
import { actions } from "../models/Rarity";

interface RarityProvider
{
	readonly rarity: Rarity;
}

export default function RarityEditor(): JSX.Element
{
	const { t } = useTranslation();
	const value = useSelector((container: RarityProvider) => container.rarity);
	const dispatch = useDispatch();

	return React.useMemo(function()
	{
		return <TextField
			fullWidth
			InputLabelProps={{shrink: true}}
			label={t("ygo:ui.rarity", { defaultValue: "Rarity" })}
			onChange={(evt)=>{dispatch(actions.set(evt.target.value as Rarity)); }}
			select
			size="small"
			value={value}
			variant="outlined"
		>
			<MenuItem value={Rarity.Common}>Common</MenuItem>
			<MenuItem value={Rarity.Rare}>Rare</MenuItem>
			<MenuItem value={Rarity.SecretRate}>Secret rare</MenuItem>
			<MenuItem value={Rarity.GhostRare}>Ghost rare</MenuItem>
			<MenuItem value={Rarity.UltraRare}>Ultra rare</MenuItem>
		</TextField>
	}, [t, value, dispatch]);
}
