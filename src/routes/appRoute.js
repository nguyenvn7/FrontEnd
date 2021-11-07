import Details from "../Container/Details";
import Cart from "../Container/Cart";
import Login from "../Container/Login";
import Page404 from "../Component/404";

 const appRoute = [
    {
        path: '/Cart',
        component: <Cart/>
    },
    {
        path: '/Details/:name',
        component: <Details/>
    },
    {
        path: '/Login',
        component: <Login/>
    },
    {
        path: '*',
        component: <Page404/>
    },
]
export default appRoute;