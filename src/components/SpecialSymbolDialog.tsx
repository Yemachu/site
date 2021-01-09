import * as React from "react";

import { 
  Button,
  ButtonGroup,

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  Grid,
  
  TextField,
} from "@material-ui/core"

const symbols = [
  "•",
  "∞",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function SpecialSymbolDialog()
{

  return <Dialog open={true}>
    <DialogTitle>Insert special symbol</DialogTitle>
    <DialogContent>
      <Grid container>
        {symbols.map(symbol => <Grid item key={symbol} xs={1}><Button key={symbol}>{symbol}</Button></Grid>)}
        <Grid item xs={12}>
          <TextField fullWidth>

          </TextField>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button>Close</Button>

    </DialogActions>
  </Dialog>
}