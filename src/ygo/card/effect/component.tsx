import React from "react";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { set } from "./actions";

export type EffectEditorProps = {
  readonly effect?: string;
  readonly disabled?: boolean;
}

export const EffectEditor = (props: EffectEditorProps): JSX.Element => {
  const { effect, disabled } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return <TextField
    disabled={disabled}
    fullWidth
    label={t("ygo:editor.effect.label", { defaultValue: "Effect" })}
    multiline
    onChange={(evt) => dispatch(set(evt.target.value))}
    size="small"
    value={effect || ""}
    variant="outlined"
  />
}