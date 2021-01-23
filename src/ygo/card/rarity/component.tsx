import React, { } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TextField, MenuItem, Divider } from "@material-ui/core";

import { set } from "./actions";

export type RarityEditorProps = {
  readonly rarity?: unknown;
}

export const RarityEditor = (props: RarityEditorProps): JSX.Element =>
{
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return <TextField
    disabled={!props.rarity}
    fullWidth
    label={t("ygo:editor.rarity.label", { defaultValue: "Rarity" })}
    onChange={(evt) => dispatch(set(0))}
    select
    variant="outlined"
    size="small"
  >
    <MenuItem>{t("Common", { defaultValue: "" })}</MenuItem>
    <MenuItem>{t("Rare", { defaultValue: "" })}</MenuItem>
    <MenuItem>{t("", { defaultValue: "" })}</MenuItem>
    <MenuItem>{t("", { defaultValue: "" })}</MenuItem>
    <MenuItem>{t("", { defaultValue: "" })}</MenuItem>
    <MenuItem>{t("", { defaultValue: "" })}</MenuItem>
  </TextField>
}