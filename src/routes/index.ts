import Home from "./Home";
import NotFound from "./404";


export {
	Home,
	NotFound,
}

export interface Route
{
	path: string;
	key: string;
	component: any;
}

const routes: readonly Route[]  = [
	{ path: "/", key: "route.home", component: Home },
];

export default routes;