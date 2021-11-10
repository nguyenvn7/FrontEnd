import React, { createContext, useReducer, useContext, useState } from 'react';
import { Reducer } from './Reducer';
import FakeProduct from "../Component/FakeProduct"

const Cart = createContext();


const Context = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,{
        products: FakeProduct,
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

export const AuthContext = ({children})=>{
    const [auth,setAuth] = useState({});
    return <Authentication.Provider value = {[auth,setAuth]}>
        {children}
    </Authentication.Provider>
}

export const AuthState = ()=>{
    return useContext(Authentication);
}