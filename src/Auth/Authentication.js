import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { checkLogged } from "../Api";
import Page404 from "../Component/404";
import Load from "../Component/Load";
import { AuthState } from "../context/context";


export function CheckLogin(){
    const [auth,setAuth] = AuthState();
    const [isLogin,setIsLogin] = useState(true);
      useEffect(() => {
        checkLogged()
        .then(data => {
          setIsLogin(false);
          setAuth(...Object.values(data));
        })
      }, []);
    return {isLogin,auth}
  }

export function PrivateLogin({children}){
    const {isLogin,auth} = CheckLogin();
    return (
      <Route
        render={()=> isLogin? (<Load/>):(auth?.username? (<Redirect to="/"/>):(children))}
      />
    )
}

function PrivateRouter({children}) {
        const {isLogin,auth} = CheckLogin();
    return(
        <Route
        render={()=>
        isLogin ? (<Load/>):( auth?.username ? (children):(<Page404/>))
        }
        />
    );
}

export default PrivateRouter;