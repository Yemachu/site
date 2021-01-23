import React from "react";

import { Divider, TextField, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Attribute } from "./type";
import { set } from "./actions";

export type AttributeEditorProps = {
  readonly attribute?: Attribute;
}

export const AttributeEditor = ({ attribute }: AttributeEditorProps): JSX.Element =>
{
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return <>
    <TextField 
      disabled={!attribute}
      label={t("ygo:editor.attribute.label", { defaultValue: "Attribute" })} 
      select 
      fullWidth 
      value={attribute}
      variant="outlined" 
      size="small"
      onChange={(evt) => dispatch(set(evt.target.value as Attribute))}
    >
      <MenuItem value={Attribute.NONE}>{t("None", { defaultValue: ""})}</MenuItem>
      <Divider />
      <MenuItem value={Attribute.DARK}>{t("Dark", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.DIVINE}>{t("Divine", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.EARTH}>{t("Earth", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.FIRE}>{t("Fire", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.LIGHT}>{t("Light", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.WATER}>{t("Water", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.WIND}>{t("Wind", { defaultValue: "" })}</MenuItem>
      <Divider />
      <MenuItem value={Attribute.SPELL}>{t("Spell", { defaultValue: "" })}</MenuItem>
      <MenuItem value={Attribute.TRAP}>{t("Trap", { defaultValue: "" })}</MenuItem>
    </TextField>
  </>
}