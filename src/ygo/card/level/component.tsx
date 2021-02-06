import React from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { TextField, Checkbox, Slider, Grid, Button } from "@material-ui/core";
import { 
  SwapHorizontalCircle as MirrorOnIcon,
  SwapHorizontalCircleOutlined as MirrorOffIcon,
} from "@material-ui/icons";

import { Level } from "./model";
import { set, mirror } from "./actions";
import { upload } from "../../upload/actions";

export type LevelEditorProps = {
  readonly level?: Level;
};

export const LevelEditor = (props: LevelEditorProps): JSX.Element =>
{
  const {
    level
  } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return <Grid container>
    <Grid item>
      <Checkbox 
        checked={level?.mirror || false}
        checkedIcon={<MirrorOnIcon />} 
        disabled={!level}
        icon={<MirrorOffIcon />}
        onChange={() => dispatch(mirror())}
      />
    </Grid>
    <Grid item xs>
      <Slider 
        disabled={!level} 
        min={0} 
        max={13} 
        marks 
        value={level?.value || 0} 
        valueLabelDisplay="auto"
        onChange={(_, value: number|number[]) => {
          // Callback requires potentially accepting multiple values at once,
          // only respond to instances where a single value is supplied.
          if (typeof value === "number")
          {
            dispatch(set(value))
          }
        }}
      />
    </Grid>
  </Grid>
}