import Home from "./Home";
import NotFound from "./404";
import YuGiOh from "../ygo";

export {
	Home,
	NotFound,
}

export interface Route
{
	path: string;
	key: string;
	defaultDisplayName: string;
	component: any;
}

const routes: readonly Route[]  = [
	{ path: "/", key: "route.home", defaultDisplayName: "Home", component: Home },
	{ path: "/ygo", key: "route.ygo", defaultDisplayName: "Yug-Gi-Oh!", component: YuGiOh }
];

export default routes;