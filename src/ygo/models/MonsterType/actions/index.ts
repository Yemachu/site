import { add, AddAction } from "./Add";
import { disable, DisableAction } from "./Disable";
import { enable, EnableAction } from "./Enable";
import { remove, RemoveAction } from "./Remove";
import { reset, ResetAction } from "./Reset";
import { set, SetAction } from "./Set";

export {
	add,
	disable,
	enable,
	remove,
	reset,
	set,
}

export type ActionTypes =
	| AddAction
	| EnableAction
	| DisableAction
	| RemoveAction
	| ResetAction
	| SetAction
	;