import React, { createContext, useContext, useState } from 'react';



const Authentication = createContext();


export const  AuthContext =  ({children})=>{
    // the first way

    // Call API truoc khi render
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET','http://localhost:3001/apiTaiKhoan/checklogged',false);
    // xhr.withCredentials = true;
    // xhr.send();
    // const data = JSON.parse(xhr.response);
    // const [auth,setAuth] = useState(...Object.values(data));

    // the second way
    // Fetch in Component App-Loading component App

    // the third way -- ... 
    // unchecked
    // Fetch in context 

    const [auth,setAuth] = useState({
        isLoad: true,
    });

    return <Authentication.Provider value = {{auth,setAuth}}>
        {children}
    </Authentication.Provider>
}

export const AuthState = ()=>{
    return useContext(Authentication);
}

const Cart = createContext();
export const CartState = ()=>{
    return useContext(Cart);
}
const Context = ({children}) => {
    //use the third way --> move to component header
    // checkLogged().then((data) => {
    //     if(data?.user){
             // getLengthCart(data.user.username).then(data => data.json()).then(data => console.log(data));
    //         console.log(data.user.username);
    //     }
    // })
    // fix set [qty,setQty] = useState(0) ~~
    const [cartqty,setCartQty] = useState({
        quantity: 0
    })
    return <Cart.Provider value={{cartqty,setCartQty}}>
        {children}
    </Cart.Provider>
}
export default Context;