import React, { createContext, useReducer, useContext, useState } from 'react';
import { Reducer } from './Reducer';
import FakeProduct from "../Component/FakeProduct"

const Cart = createContext();


const Context = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,{
        products: FakeProduct,
        cart:[]
    })
    const [auth,setAuth] = useState(false);
    return <Cart.Provider value={{state,dispatch,auth,setAuth}}>
        {children}
    </Cart.Provider>
}
export default Context;
export const CartState = ()=>{
    return useContext(Cart);
}