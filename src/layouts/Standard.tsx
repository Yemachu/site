import React, { useState } from "react";
import { 
  AppBar,
  Divider,
  makeStyles,
  createStyles,
  CssBaseline,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar, 
} from "@material-ui/core";
import { LayoutProps } from "./props";

import {
  Menu as MenuIcon,
} from "@material-ui/icons";

type StyleProps = {
  readonly drawerWidth: number;
}

const useStyles = makeStyles(theme => createStyles<string, StyleProps>({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: props => props.drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: props => props.drawerWidth,
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: props => `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props => props.drawerWidth,
    },
  },
  content: {
    flexGrow: 1,
  }

}));

export const StandardLayout = (props: LayoutProps): JSX.Element =>
{
  const {
    children,
    header,
    sidebar,
    footer,
  } = props;

  const [open, setOpen] = useState(false);
  const classes = useStyles({ drawerWidth: 320 });
  
  return <div className={classes.root}>
    <CssBaseline/>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" edge="start" onClick={()=>setOpen(true)}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
        {header || null}
      </Toolbar>
    </AppBar>
    <Hidden mdUp>
      <SwipeableDrawer open={open} onClose={()=>setOpen(false)} onOpen={()=>setOpen(true)} classes={{paper: classes.drawerPaper}}>
        <Toolbar/>
        <Divider/>
        {sidebar || null}
      </SwipeableDrawer>
    </Hidden>
    <Hidden smDown>
      <Drawer variant="permanent" open classes={{paper: classes.drawerPaper}} className={classes.drawer}>
        <Toolbar/>
        <Divider/>
        {sidebar || null}
      </Drawer>
    </Hidden>
    <Grid container className={classes.content} direction="column">
      <Grid item>
        <Toolbar />
      </Grid>
      <Grid item>
        {children || null}
      </Grid>
      <Grid item>
        {footer || null}
      </Grid>
    </Grid>
  </div>
}