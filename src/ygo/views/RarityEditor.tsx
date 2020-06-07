import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { TextField, MenuItem } from "@material-ui/core";

import { Rarity } from "../models";

export default function RarityEditor(): JSX.Element
{
	const { t } = useTranslation();
	const value = useSelector(()=>null);
	const dispatch = useDispatch();

	return React.useMemo(function()
	{
		return <TextField
			fullWidth
			InputLabelProps={{shrink: true}}
			label={t("ygo:ui.rarity", { defaultValue: "Rarity" })}
			select
			size="small"
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
