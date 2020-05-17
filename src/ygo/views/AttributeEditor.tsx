import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Select, MenuItem, Divider } from "@material-ui/core";

import { Card, Attribute } from "../models";
import * as actions from "../models/Attribute/actions";

export default function AttributeEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<Card, Attribute>(state => state.attribute);
	const { t } = useTranslation();

	return React.useMemo(function () {
		return <Select 
			value={value} 
			onChange={(evt) => {dispatch(actions.set(evt.target.value as Attribute));}}
			fullWidth
		>
			<MenuItem value={Attribute.NONE}>{t("ygo.attribute.None", {defaultValue: "None"})}</MenuItem>
			<Divider component="li" />
			<MenuItem value={Attribute.DARK}>{t("ygo:ui.attribute.Dark", { defaultValue: "Dark" })}</MenuItem>
			<MenuItem value={Attribute.DIVINE}>{t("ygo:ui.attribute.Divine", { defaultValue: "Divine" })}</MenuItem>
			<MenuItem value={Attribute.EARTH}>{t("ygo:ui.attribute.Earth", { defaultValue: "Earth" })}</MenuItem>
			<MenuItem value={Attribute.FIRE}>{t("ygo:ui.attribute.Fire", { defaultValue: "Fire" })}</MenuItem>
			<MenuItem value={Attribute.LIGHT}>{t("ygo:ui.attribute.Light", { defaultValue: "Light" })}</MenuItem>
			<MenuItem value={Attribute.WATER}>{t("ygo:ui.attribute.Water", { defaultValue: "Water" })}</MenuItem>
			<MenuItem value={Attribute.WIND}>{t("ygo:ui.attribute.Wind", { defaultValue: "Wind" })}</MenuItem>
			<Divider component="li" />
			<MenuItem value={Attribute.SPELL}>{t("ygo:ui.attribute.Spell", { defaultValue: "Spell" })}</MenuItem>
			<MenuItem value={Attribute.TRAP}>{t("ygo:ui.attribute.Trap", { defaultValue: "Trap" })}</MenuItem>
		</Select>

	}, [value, dispatch]);
}