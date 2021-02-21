import React, {} from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Grid,
  TextField,
} from "@material-ui/core";

export type PendulumEditorProps = {
  readonly disabled?: boolean;
};

export const PendulumEditor = (props: PendulumEditorProps): JSX.Element =>
{
  const {
    disabled,
  } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  return <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField 
        disabled={disabled} 
        fullWidth 
        label={t("ygo:editor.pendulum.blue.label", { defaultValue: "Blue" })}
        size="small"
        variant="outlined"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField 
        disabled={disabled} 
        fullWidth 
        label={t("ygo:editor.pendulum.red.label", { defaultValue: "Red" })}
        size="small"
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField 
        disabled={disabled} 
        fullWidth 
        label={t("ygo:editor.pendulum.effect.label", { defaultValue: "Pendulum effect" })}
        multiline 
        size="small"
        variant="outlined"
      />
    </Grid>
  </Grid>
}