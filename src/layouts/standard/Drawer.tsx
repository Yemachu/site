import * as React from "react";

import {
	Hidden,
	Drawer as PersistentDrawer,
	SwipeableDrawer,
	Divider,
	Toolbar,

	createStyles,
	makeStyles,
	Theme,
} from "@material-ui/core";

import clsx from "clsx";

export interface DrawerProps
{
	isOpen: boolean;
	setIsOpen: (value: boolean) => unknown;
}

const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		drawer: {
			[theme.breakpoints.up("md")]: {
				width: DRAWER_WIDTH,
				flexShrink: 0,
			},
		},
		paper: {
			width: DRAWER_WIDTH,
		},
		temporaryDrawerPaper: {
			maxWidth: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
		},
	});
});

export default React.forwardRef(function Drawer({isOpen, setIsOpen}: DrawerProps, ref: React.Ref<HTMLDivElement>)
{
	const classes = useStyles();
	return React.useMemo(function()
	{
		const content = <React.Fragment>
			<Toolbar />
			<Divider />

			<div ref={ref}>

			</div>
		</React.Fragment>

		return <div className={classes.drawer}>
			<Hidden smDown implementation="js">
				<PersistentDrawer
					open
					variant="permanent"
					classes={{ paper: classes.paper }}
				>
					{content}
				</PersistentDrawer>
		
			</Hidden>
			<Hidden mdUp implementation="js">
				<SwipeableDrawer
					open={isOpen}
					variant="temporary"
					onOpen={() => { setIsOpen(true); }}
					onClose={() => { setIsOpen(false); }}
					classes={{ paper: clsx(classes.paper, classes.temporaryDrawerPaper) }}
				>
					{content}
				</SwipeableDrawer>
			</Hidden>
		</div>
	}, [isOpen, setIsOpen, classes]);
});