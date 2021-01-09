import { RootAction as YgoActions } from "./ygo";

declare module "typesafe-actions" {
  interface Types {
    RootAction: YgoActions;
  }
}