import Header from "./Component/Header";
import SideBar from "./Component/SideBar";
import appRoute from "./routes/appRoute";
import Page404 from "./Component/404";
import HomePage from "./Container/HomePage";
import Admin from "./Container/Admin";
import { Route, Switch } from "react-router-dom";
import { login } from "./Api";
import { useState } from "react";


function PrivateRoute({children}){
  const [auth, setAuth] = useState(false);
  login()
      .then(data => console.log(data.status))
  return(
    <Route
      render={(props)=>
        props?.true ? (children):(<Page404/>)
      }
    />
  )
}

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
              <HomePage/>
        </Route>
        <PrivateRoute path="/admin">
          <Admin/>
        </PrivateRoute>
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
