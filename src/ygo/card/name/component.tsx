import React from "react";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { set } from "./actions";

export type NameEditorProps = {
  readonly name?: string;
}

export const NameEditor = (props: NameEditorProps): JSX.Element =>
{
  const { name } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return <TextField 
    disabled={typeof name === "undefined"}
    fullWidth
    label={t("ygo:editor.name.label", { defaultValue: "Name"})}
    onChange={(evt) => dispatch(set(evt.target.value))}
    size="small"
    value={name || ""}
    variant="outlined"
  />
}