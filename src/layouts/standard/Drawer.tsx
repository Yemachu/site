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

export interface DrawerProps
{
	isOpen: boolean;
	setIsOpen: (value: boolean) => any;
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
	});
});

export default function Drawer({isOpen, setIsOpen}: DrawerProps)
{
	const classes = useStyles();
	return React.useMemo(function()
	{
		const content = <React.Fragment>
			<Toolbar />
			<Divider />
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
					classes={{ paper: classes.paper }}
				>
					{content}
				</SwipeableDrawer>
			</Hidden>
		</div>
	}, [isOpen, setIsOpen, classes]);
}