import * as React from "react";

import { useTranslation } from "react-i18next";

import { StandardLayout } from "../layouts";

import {
	Typography
} from "@material-ui/core";

export default function()
{
	const { t } = useTranslation();
	return <StandardLayout>
		<Typography variant="h1">404</Typography>
		<Typography>
			
		</Typography>
	</StandardLayout>;
}