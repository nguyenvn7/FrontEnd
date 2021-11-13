import { useState } from "react";
import { logout } from "../Api";
import {  AuthState } from "../context/context";
import { Link,useHistory } from "react-router-dom";

function Avatar() {
    const {setAuth} = AuthState();
    const [toggle,setToggle] = useState(false);
    const history = useHistory();
    // const handleWindowClick = () => {
    //     // setToggle(false);
    //     console.log('window click')
    //     // setToggle(toggle + 1);
    // };
    // console.log(toggle)
    // useEffect(() => {
    //     console.log('useEffect')
    //     document.addEventListener("mousedown",handleWindowClick,true);
    //     return () => {
    //         // console.log('unmount');
    //         document.removeEventListener("mousedown",handleWindowClick,true);
    //     }   
    // }, [])
    // console.log(toggle);
    return ( 
        <div className="Avatar" 
            onClick = {() => setToggle(!toggle)}
        >
            <img src="https://member.imagineacademy.microsoft.com/sites/all/themes/custom/ita_members/images/microsoft-img.png" alt="" /> 
           {toggle &&  <div className="Avatar-menu">
                <ul>
                <li onClick={()=>{
                    logout();
                    setAuth({isLoad: false});
                    history.push('/');
                }} >Logout</li>
 
                <li><Link to="/settings">
                    Cái Đặt
                </Link></li>
                </ul>
            </div>}
        </div>
     );
}

export default Avatar;