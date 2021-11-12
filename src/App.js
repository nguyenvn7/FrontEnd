
import appRoute from "./routes/appRoute";
import Page404 from "./Component/404";
import HomePage from "./Container/HomePage";
import Login from "./Container/Login";
import Signup from "./Container/Signup";
import Admin from "./Container/Admin";
import { Route, Switch,Redirect } from "react-router-dom";
import SettingsAccount from "./Component/SettingsAccount";
import PrivateRouter, {CheckLogin, PrivateLogin} from "./Auth/Authentication"; 

  function App (){
    const {isLoad,auth} = CheckLogin();
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
        <PrivateRouter path="/admin">
          <Admin/>
        </PrivateRouter>
        <PrivateRouter path="/Settings">
          <SettingsAccount/>
        </PrivateRouter>

        <PrivateLogin path="/Signup"> 
          <Signup/> 
        </PrivateLogin>
        <PrivateLogin path="/Login">
          <Login/>
        </PrivateLogin>

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
