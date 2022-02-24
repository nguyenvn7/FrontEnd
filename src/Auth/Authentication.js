import { useEffect } from "react";
import { Redirect, Route } from "react-router";
import { checkLogged } from "../Api";
import Page404 from "../Component/404";
import Load from "../Component/Load";
import { AuthState } from "../context/context";
//co the do setstate nhieu lan
/// sua bi lap set 3 lan
export  function  CheckLogin(name){

    const {auth,setAuth} = AuthState();
    useEffect(() => { 
        console.log('CheckLogin',name);
        if(auth?.username){
          checkLogged()
          .then(data => {
            console.log('effect ',name);
            setAuth(Object.assign({isLoad:false},...Object.values(data)));
          });
        }
        return ()=>{
          console.log('unmount clg ',name)
        }
        //eslint-disable-next-line
      }, []);

    return {auth}
  }

export function PrivateLogin({children,name}){
    console.log('PrivateLogin')
    const {auth} = CheckLogin(name);
    return (
      <Route
        render={()=> auth.isLoad? (<Load/>):(auth?.username? (<Redirect to="/"/>):(children))}
      />
    )
}

export function PrivateAdmin({children,name}){
  console.log('PrivateLogin')
  const {auth} = CheckLogin(name);
  return (
    <Route
      render={()=> auth.isLoad? (<Load/>):(auth?.role==='1'?  (children):(<Page404/>))}
    />
  )
}

export function PrivateCart({children,name}){
  // cart van con vao duoc do async
  console.log('PrivateCart');
    const {auth} = CheckLogin(name);
    console.log('cart auth: ',auth)
    return(
      <Route
        render={() => auth?.username? (children):(<Redirect to="/login"/>)}
      />
    )
}

function PrivateRouter({children,name}) {
        console.log('PrivateRouter');
        const {auth} = CheckLogin(name);
    return(
        <Route
        render={()=>
        auth.isLoad ? (<Load/>):( auth?.username ? (children):(<Page404/>))
        }
        />
    );
}

export default PrivateRouter;

