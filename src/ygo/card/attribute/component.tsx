import React from "react";

import { TextField, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const AttributeEditor = (): JSX.Element =>
{
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return <>
    <TextField label={t("ygo:editor.attribute.label", { defaultValue: "Attribute" })} select fullWidth variant="outlined" size="small">
      <MenuItem value={0}>{t("DARK", { defaultValue: ""})}</MenuItem>
      <MenuItem value={1}>{t("DIVINE", { defaultValue: ""})}</MenuItem>
    </TextField>
  </>
}