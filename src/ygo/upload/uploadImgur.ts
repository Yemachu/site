import { Epic } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { concat, of } from "rxjs";
import { filter, mergeMap, takeUntil, catchError, withLatestFrom, map } from "rxjs/operators";
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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx?.fillText(JSON.stringify(state,undefined, 2), 0, 12);

      const request = {
        url: "https://api.imgur.com/3/image",
        crossDomain: true,
        method: "POST",
        body: {
          image: canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, ""),
          type: "base64",
          title: "Image"
        },
        headers: {
          "Authorization": `Client-ID ${process.env.GATSBY_IMGUR_API_KEY}`,
          "Accept": "application/json"
        }
      };

      return ajax(request).pipe(
        map((response) => { console.log(response); return success(action.meta.id) }), 
        takeUntil(action$.pipe(
          filter(isActionOf(abort)),
          filter(a => a.meta.id == action.meta.id)
        )),
        catchError((error) => {console.error(error); return of(failure(action.meta.id)) })
      );
    })
  );
}