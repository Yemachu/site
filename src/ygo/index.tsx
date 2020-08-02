import * as React from "react";
import { Helmet } from "react-helmet";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import * as storage from "localforage";
import { Provider } from "react-redux";

import { Grid } from "@material-ui/core";
import { CardRenderer } from "./views";
import { reducer } from "./models/Card";

import {
	AttributeEditor,
	BackrowTypeEditor,
	CopyrightEditor,
	SerialNumberEditor,
	ImageEditor,
	LevelEditor,
	LinkEditor,
	MonsterTypeEditor,
	NameEditor,
	EffectEditor,
	PendulumEditor,
	RarityEditor,
	StatsEditor,
	TemplateEditor,

} from "./views";

const store = createStore(persistReducer({key: "ygo", storage}, reducer));
const persistor = persistStore(store);

export default function YuGiOh(): JSX.Element
{
	return <React.Fragment>
		<Helmet>
			<title>Yu-Gi-Oh! Card maker</title>
		</Helmet>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={12} lg={6} container>
						<Grid item xs={12}>
							<CardRenderer />
						</Grid>
					</Grid>

					<Grid item xs={12} sm={6} md={12} lg={6} >
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TemplateEditor />
							</Grid>
							<Grid item xs={6}>
								<RarityEditor />
							</Grid>
							<Grid item xs={8}>
								<NameEditor />
							</Grid>
							<Grid item xs={4}>
								<AttributeEditor />
							</Grid>
							<Grid item xs={12}>
								<LevelEditor />
								<BackrowTypeEditor />
							</Grid>
							<Grid item xs={12}>
								<ImageEditor />
								<LinkEditor />
							</Grid>
							<Grid item xs={12}>
								<PendulumEditor />
							</Grid>
							<Grid item xs={12}>
								<MonsterTypeEditor />
								<EffectEditor />
								<StatsEditor />
							</Grid>
							<Grid item xs={6}>
								<SerialNumberEditor />
							</Grid>
							<Grid item xs={6}>
								<CopyrightEditor />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</PersistGate>
		</Provider>
	</React.Fragment>
}
