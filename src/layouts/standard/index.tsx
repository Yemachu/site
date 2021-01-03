import * as React from "react";

import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,

	ThemeProvider,
	CssBaseline,

	createMuiTheme,
	useMediaQuery,

	createStyles,
	makeStyles,
	Theme,
	Paper,
	Tabs,
	Tab,

} from "@material-ui/core";

import { Route } from "../../routes";

import {
	LanguageSelector,

} from "../../components";

import { Sidebar } from "../Compontents";

import i18next from "i18next";

i18next.init();

import {
	useTranslation,
	I18nextProvider,

} from "react-i18next"

import {
	indigo,
	amber,

} from "@material-ui/core/colors"

import {
	Menu as MenuIcon,

} from "@material-ui/icons";

import { Helmet } from "react-helmet";

import { Link, withPrefix } from "gatsby"
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";


import Drawer from "./Drawer";

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		appBar: {
			[theme.breakpoints.up("md")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		title: {
			flexGrow: 1,

		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("md")]: {
				display: "none"
			},
		},

		content: {
			flexGrow: 1,
			padding: theme.spacing(2),
		},
		root: {
			display: "flex",
		},
		toolbar: {

		}

	});
});

const DARK_PALETTE: ThemeOptions = {
	palette: {
		type: "dark",
		primary: {
			main: indigo[200],
		},
		secondary: {
			main: amber[200],
		},
	},
};

const LIGHT_PALETTE: ThemeOptions = {
	palette: {
		type: "light",
		primary: indigo,
		secondary: amber,
	},
}

export interface LayoutProps
{
	readonly children: JSX.Element | readonly JSX.Element[];
	readonly routes?: readonly Route[];
	readonly location?: Location;
}




export default function Layout(props: LayoutProps): JSX.Element
{
	const ref = React.useRef<HTMLDivElement>();
	const classes = useStyles();
	const prefersDark = useMediaQuery("");
	const theme = React.useMemo(() => {
		return createMuiTheme(prefersDark ? DARK_PALETTE : LIGHT_PALETTE);
	}, [prefersDark]);

	const { t } = useTranslation();

	const [drawerOpen, setDrawerOpen] = React.useState(false);
	const activeTab = props.routes?.findIndex((route)=>withPrefix(route.path)==props.location?.pathname) || 0;
	const tabs = React.useMemo(()=>{
		return props.routes?.map((route)=>{
			const text = t(route.key, { defaultValue: route.defaultDisplayName });
			return <Tab key={route.key} label={text} component={Link} to={route.path} />;
		})

	}, [props.routes, t]);

	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<Helmet>
			<meta name="theme-color" content={prefersDark ? indigo[200] : indigo[500]} />
		</Helmet>

		<I18nextProvider i18n={i18next}>

			<div className={classes.root}>
				<AppBar className={classes.appBar} color={prefersDark ? "default" : "primary"}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={(e) => { setDrawerOpen(!drawerOpen); }}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="h1" className={classes.title} noWrap >Neo Card Maker</Typography>
						<LanguageSelector language="en" setLanguage={() => { }} />
					</Toolbar>

					<Paper square>
						<Tabs value={activeTab} variant="scrollable">
							{tabs}
						</Tabs>
					</Paper>
				</AppBar>
				<Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} ref={ref}/>

				<main className={classes.content}>
					<Toolbar />
					<Tabs value={0} />

					<Sidebar.Provider value={ref}>
						{props.children}
					</Sidebar.Provider>
				</main>
			</div>
		</I18nextProvider>
	</ThemeProvider>
};
