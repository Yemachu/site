import * as React from "react";

import {
	Button, 
	Menu,
	MenuItem,

} from "@material-ui/core";


import {
	ExpandMore as ExpandMoreIcon,
	Translate as TranslateIcon,

} from "@material-ui/icons";


export interface LanguageSelectorProps
{
	language: string; // TODO: Replace with an enum of all availble languages.
	setLanguage: (newValue: string)=>any;
}

export default function LanguageSelector({language, setLanguage}: LanguageSelectorProps)
{
	const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

	return React.useMemo(function()
	{
		return <React.Fragment>
			<Button
				startIcon={<TranslateIcon color="inherit" />}
				endIcon={<ExpandMoreIcon color="inherit" />}
				onClick={(evt)=>{setAnchor(evt.currentTarget);}}
				color="inherit"
			>
				English
			</Button>
			<Menu open={Boolean(anchor)} onClose={() => { setAnchor(null); }} anchorEl={anchor}>
				<MenuItem onClick={() => { setAnchor(null); setLanguage("en"); }}>English</MenuItem>
				<MenuItem onClick={() => { setAnchor(null); setLanguage("nl"); }}>Nederlands</MenuItem>
				<MenuItem onClick={() => { setAnchor(null); setLanguage("fr"); }}>Français</MenuItem>
			</Menu>
		</React.Fragment>;
		
	}, [language, setLanguage, anchor, setAnchor]);
}