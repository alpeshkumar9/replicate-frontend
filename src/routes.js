import Home from "./views/Home";
import Login from "./views/Login";

var routes = [
    {
        path: "/",
        name: "Books",
        icon: "ni ni-tv-2 text-primary",
        component: <Home />,
        layout: "/",
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/",
        api: true
    },
];
export default routes;