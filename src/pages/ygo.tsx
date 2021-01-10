import React from "react";

import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ignoreElements, tap } from "rxjs/operators";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import * as storage from "localforage";

import { Button, Typography } from "@material-ui/core";

import { StandardLayout } from "../layouts";
import { ErrorBoundary, useFallbackContext } from "../utils";
import { YgoCardMaker, ProjectEditor, state } from "../ygo";

const services = createEpicMiddleware();
const appState = createStore(persistReducer({ key: "ygo", storage, version: 0 }, state), applyMiddleware(services));
const persistor = persistStore(appState);
services.run((action$) => action$.pipe(
  tap({next: (action) => console.log(action)}),
  ignoreElements()
));

const Fallback = (): JSX.Element =>
{
  const { reset, error } = useFallbackContext();
  const { t } = useTranslation();
  return <>
    <Button onClick={reset}>{t("Reset")}</Button>
  </>
}

const YgoCardMakerPage = () =>
{
  return <Provider store={appState}>
    <StandardLayout
      sidebar={<ErrorBoundary fallback={<Fallback/>}>
        <PersistGate persistor={persistor} loading={null}>
          <ProjectEditor/>
        </PersistGate>
      </ErrorBoundary>}
      header={<ErrorBoundary fallback={<Fallback/>}><Typography variant="h5" component="h1">Card maker</Typography></ErrorBoundary>}
    >
      <ErrorBoundary fallback={<Fallback/>}>
        <PersistGate persistor={persistor} loading={null}>
          <YgoCardMaker/>
        </PersistGate>
      </ErrorBoundary>
    </StandardLayout>
  </Provider>
}

export default YgoCardMakerPage; // Gatsby required default exports.