import { useState } from "react";
import { GetInfor, logout } from "../Api";
import {  AuthState, AvatarState } from "../context/context";
import { Link,useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function Avatar() {
    const {auth,setAuth} = AuthState();
    const {avatar,setAvatar} = AvatarState();
    const [toggle,setToggle] = useState(false);
    const history = useHistory();
    useEffect(()=>{
        GetInfor(auth)
        .then((data) => data.json())
        .then((data) => {
            setAvatar((data.img || 'https://img.favpng.com/1/4/11/portable-network-graphics-computer-icons-google-account-scalable-vector-graphics-computer-file-png-favpng-HScCJdtkakJXsS3T27RyikZiD.jpg'));
        });
        //eslint-disable-next-line
    },[])
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
            <img src={avatar} alt="" /> 
           {toggle &&  <div className="Avatar-menu">
                <ul>
                <li onClick={()=>{
                    logout();
                    setAuth({isLoad: false});
                    history.push('/');
                }} >Logout</li>
 
                <li><Link to="/settings">
                    Cài Đặt
                </Link></li>
                </ul>
            </div>}
        </div>
     );
}

export default Avatar;