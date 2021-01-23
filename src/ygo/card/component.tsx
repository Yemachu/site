import React from "react";

import { Box, Grid } from "@material-ui/core";

import { ErrorBoundary, } from "../../utils";

import { NameEditor } from "./name";
import { LevelEditor } from "./level";
import { AttributeEditor } from "./attribute";
import { TemplateEditor } from "./template";
import { RarityEditor } from "./rarity";

import { Card } from "./model";

export type CardEditorProps = {
  readonly card?: Card; 
};

export const CardEditor = ({ card }: CardEditorProps): JSX.Element =>
{
  return <Box p={2}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}><TemplateEditor template={card?.template} /></Grid>
      <Grid item xs={12} sm={6}><RarityEditor /></Grid>
      <Grid item xs={12} sm={8}><NameEditor name={card?.name} /></Grid>
      <Grid item xs={12} sm={4}><AttributeEditor attribute={card?.attribute} /></Grid>
      <Grid item xs={12}><LevelEditor level={card?.level} /></Grid>
    </Grid>
  </Box>
}