import { Epic } from "redux-observable";
import { concat, of } from "rxjs";
import { filter, mergeMap, takeUntil, catchError, withLatestFrom } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { upload, abort, success, failure } from "./actions";

export const UploadImgur: Epic = (action$, state$, dependencies) =>
{
  return action$.pipe(
    filter(isActionOf(upload)),
    withLatestFrom(state$),
    // Multiple uploads can run concurrently.
    mergeMap(([action, state]) => 
    {
      return concat( // Allows for emitting intermediate state events.
        of(action.meta.id),
        takeUntil(action$.pipe(filter(isActionOf(abort)))),
        of(success(action.meta.id)),
        catchError(() => of(failure(action.meta.id)))
      )
    })
  );
}