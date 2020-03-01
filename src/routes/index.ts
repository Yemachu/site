import Home from "./Home";
import NotFound from "./404";


export {
	Home,
	NotFound,
}

const routes: readonly any[]  = [
	{ path: "/", key: "route.home", component: Home },
];

export default routes;