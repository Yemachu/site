import { Copyright } from "./type"

const initialState: Copyright = "© 1996 KAZUKI TAKAHASHI";

export default function CopyrightReducer(

	state: Copyright = initialState
): Copyright
{
	return state;
}