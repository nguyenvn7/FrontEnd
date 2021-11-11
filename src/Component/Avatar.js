import { useEffect, useState } from "react";
import { logout } from "../Api";
import {  AuthState } from "../context/context";

function Avatar() {
    const [auth,setAuth] = AuthState();
    const [toggle,setToggle] = useState(false);
    // const handleWindowClick = () => {
    //     // setToggle(false);
    //     console.log('window click')
    // };
    // useEffect(() => {
    //     window.addEventListener("click",handleWindowClick);
    //     return () => {
    //         window.removeEventListener(handleWindowClick);
    //     }   
    // }, [])
    return ( 
        <div className="Avatar" 
            onClick = {() => setToggle(!toggle)}
        >
            <img src="https://member.imagineacademy.microsoft.com/sites/all/themes/custom/ita_members/images/microsoft-img.png" alt="" /> 
           {toggle &&  <div className="Avatar-menu">
                <p onClick={()=>{
                    logout();
                    setAuth({});
                }} >Logout</p>
            </div>}
        </div>
     );
}

export default Avatar;