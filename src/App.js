import appRoute from "./routes/appRoute";
import HomePage from "./Container/HomePage";
import Login from "./Container/Login";
import Signup from "./Container/Signup";
import Admin from "./Container/Admin";
import { Route, Switch } from "react-router-dom";
import SettingsAccount from "./Component/SettingsAccount";
import PrivateRouter, {
  PrivateLogin,
  PrivateCart,
} from "./Auth/Authentication";
import Cart from "./Container/Cart";
import { useEffect, useState } from "react";
import { checkLogged } from "./Api";
import { AuthState } from "./context/context";
import Load from "./Component/Load";
import Header from "./Component/Header";


function App() {
  const {auth,setAuth} = AuthState();
  const [img,setImg] = useState();
  useEffect(()=>{
      checkLogged()
          .then(data => {     
            console.log('fetch app');
              setAuth(Object.assign({isLoad:false},...Object.values(data)));
          });
         return ()=> console.log('unmount app');
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])
        console.log('app');
  return (
    <>
    <Header/>
    {auth.isLoad? (<Load/>):(
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <PrivateRouter path="/admin" name="admin">
          <Admin />
        </PrivateRouter>
        <PrivateRouter path="/Settings" name="settings">
          <SettingsAccount />
        </PrivateRouter>

        <PrivateLogin path="/Signup" name="signup">
          <Signup />
        </PrivateLogin>
        <PrivateLogin path="/Login" name="login">
          <Login />
        </PrivateLogin>

        <PrivateCart path="/Cart" name="cart">
          <Cart />
        </PrivateCart>

        {appRoute.map((value) => (
          <Route path={value.path} key={value.path}>
            {value.component}
          </Route>
        ))}
      </Switch>
    )}
    </>
  );
}

export default App;
