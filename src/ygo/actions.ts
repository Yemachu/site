import { Actions as RenderActions } from "./render/actions";
import { actions as CardActions } from "./card";
import { Actions as ProjectActions } from "./project/actions";
import { Actions as UploadActions } from "./upload/actions";
import { actions as SettingActions } from "./settings";

export type RootAction =
| RenderActions
| CardActions.RootAction
| ProjectActions
| SettingActions.RootAction
| UploadActions
;
