import Home from "./views/Home";

var routes = [
    {
        path: "/",
        name: "Books",
        icon: "ni ni-tv-2 text-primary",
        component: <Home />,
        layout: "/",
    },
];
export default routes;