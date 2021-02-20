import React, {} from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Divider, TextField, MenuItem } from "@material-ui/core";
import { Template } from "./type";
import { set } from "./actions";

export type TemplateEditorProps = {
  readonly template?: Template;
}

export const TemplateEditor = ({ template }: TemplateEditorProps): JSX.Element =>
{
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return <TextField
    disabled={!template}
    fullWidth
    label={t("ygo:editor.template.label", { defaultValue: "Template" })}
    onChange={(evt) => dispatch(set(evt.target.value as Template))}
    select
    size="small"
    value={template}
    variant="outlined"
  >
    <MenuItem value={Template.NORMAL}>{t("Normal", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.EFFECT}>{t("Effect", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.RITUAL}>{t("Ritual", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.FUSION}>{t("Fusion", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.SYNCHRO}>{t("Synchro", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.DARK_SYNCHRO}>{t("Dark Synchro", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.XYZ}>{t("Xyz", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.LINK}>{t("Link", { defaultValue: "" })}</MenuItem>
    <Divider />
    <MenuItem value={Template.SPELL}>{t("Spell", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.TRAP}>{t("Trap", { defaultValue: "" })}</MenuItem>
    <Divider />
    <MenuItem value={Template.SKILL}>{t("Skill", { defaultValue: "" })}</MenuItem>
    <MenuItem value={Template.TOKEN}>{t("Token", { defaultValue: "" })}</MenuItem>

  </TextField>
}