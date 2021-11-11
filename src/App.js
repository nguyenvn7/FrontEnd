
import appRoute from "./routes/appRoute";
import Page404 from "./Component/404";
import HomePage from "./Container/HomePage";
import Login from "./Container/Login";
import Signup from "./Container/Signup";
import Admin from "./Container/Admin";
import { Route, Switch,Redirect } from "react-router-dom";
import {  checkLogged, login, logout } from "./Api";
import { useEffect, useState } from "react";
import { AuthState, CartState } from "./context/context";
import Load from "./Component/Load";


function CheckLoggedAPI(){
  const [auth,setAuth] = AuthState();
  const [isLoad,setIsLoad] = useState(true);
    useEffect(() => {
      checkLogged()
      .then(data => {
        setIsLoad(false);
        setAuth(...Object.values(data));
      })
    }, []);
  return {isLoad,auth}
}

function PrivateAdmin({children}){
  const {isLoad,auth} = CheckLoggedAPI();
  return(
    <Route
      render={()=>
       isLoad ? (<Load/>):( auth?.username ? (children):(<Page404/>))
      }
    />
  )
}

function PrivateLoginSignup({children}){
  const {isLoad,auth} = CheckLoggedAPI();
  return (
    <Route
      render={()=> isLoad? (<Load/>):(auth?.username? (<Redirect to="/"/>):(children))}
    />
  )
}

  function App (){
    const {isLoad,auth} = CheckLoggedAPI();
    if(isLoad){
      return(
        <div>Load</div>
      )
    }
  return (
    <>
      <Switch>
        <Route exact path="/">
              <HomePage/>
        </Route>
        <PrivateAdmin path="/admin">
          <Admin/>
        </PrivateAdmin>

        <PrivateLoginSignup path="/Signup">
          <Signup/> 
        </PrivateLoginSignup>
        <PrivateLoginSignup path="/Login">
          <Login/>
        </PrivateLoginSignup>

         {appRoute.map((value) => (
          <Route path={value.path} key={value.path}>
            {value.component}
          </Route>
        ))}
      </Switch>
    </>
  );
}

export default App;
