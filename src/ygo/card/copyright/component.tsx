import React, { } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { 
  TextField,
} from "@material-ui/core";

export type CopyrightEditorProps = {
  readonly disabled?: boolean;
};

export const CopyrightEditor = (props: CopyrightEditorProps): JSX.Element =>
{
  const {
    disabled,
  } = props;
  
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return <TextField
    disabled={disabled}
    fullWidth
    label={t("ygo:editor.card.copyright.label", { defaultValue: "Copyright" })}
    size="small"
    variant="outlined"
  />
}