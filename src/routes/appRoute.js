import Details from "../Container/Details";
import Page404 from "../Component/404";


 const appRoute = [
   
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