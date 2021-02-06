import React, { } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TextField, MenuItem, Divider } from "@material-ui/core";

import { Rarity } from "./type";
import { set } from "./actions";

export type RarityEditorProps = {
  readonly rarity?: Rarity;
  readonly disabled?: boolean;
}

export const RarityEditor = (props: RarityEditorProps): JSX.Element =>
{
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return <TextField
    disabled={props.disabled}
    fullWidth
    label={t("ygo:editor.rarity.label", { defaultValue: "Rarity" })}
    onChange={(evt) => dispatch(set(evt.target.value as Rarity))}
    select
    value={props.rarity}
    variant="outlined"
    size="small"
  >
    <MenuItem value={Rarity.COMMON}>{t("Common", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Rarity.RARE}>{t("Rare", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Rarity.ULTRA_RARE}>{t("Ultra rare", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Rarity.SECRET_RARE}>{t("Secret rare", { defaultValue: "" })}</MenuItem>
  </TextField>
}