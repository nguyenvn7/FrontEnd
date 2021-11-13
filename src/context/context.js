import React, { createContext, useReducer, useContext, useState } from 'react';
import { Reducer } from './Reducer';
import products from "../Component/FakeProduct";

const Cart = createContext();


const Context = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,{
        products,
        cart:[]
    })
    return <Cart.Provider value={{state,dispatch}}>
        {children}
    </Cart.Provider>
}
export default Context;
export const CartState = ()=>{
    return useContext(Cart);
}

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
    // Loading component App

    const [auth,setAuth] = useState({
        isLoad: true,
        username: {}
    });

    return <Authentication.Provider value = {{auth,setAuth}}>
        {children}
    </Authentication.Provider>
}

export const AuthState = ()=>{
    return useContext(Authentication);
}