import Details from "../Container/Details";
import Cart from "../Container/Cart";
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
        path: '*',
        component: <Page404/>
    },
]
export default appRoute;