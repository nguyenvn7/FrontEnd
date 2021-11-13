export const Reducer = (state, dispatch) => {
    switch (dispatch.type) {
        case 'ADD_TO_CART':
            if (state.cart.some(value => {
                    if (value.id === dispatch.payload.id) {
                        value['quantity'] = value.quantity + dispatch.payload.quantity;
                        return true;
                    }
                    return false;
                })) {
                    return state;
            } else {
                return {
                    ...state,
                    cart: [...state.cart, {
                        ...dispatch.payload
                    }]
                }
            }
            case 'REMOVE_FROM_CART':
                return {...state,cart: state.cart.filter(value => value.id !== dispatch.payload.id)};

            case 'REMOVE_SELECT_FROM_CART':
                 return {...state,cart: state.cart.filter(value => !dispatch.payload.some(valueDP => valueDP.id === value.id))};

            case 'CHANGE_CART_QTY':            
                return {
                        ...state,cart: state.cart.filter(value => value.id === dispatch.payload.id? (value.quantity=dispatch.payload.quantity):true)
                    }
            case 'CHANGE_SELECT_CART':
                return {
                    ...state,cart: state.cart.map(
                        value=> {           
                            if(value.id === dispatch.payload){
                                value.select = !value.select                         
                            }                           
                            return value
                        }
                    )
                }
          case "CHANGE_ALL_SELECT_CART":
              return{
                  ...state,cart: state.cart.map(
                      value=>{
                        value.select = dispatch.payload
                          return value;
                      }
                  )}
                default:
                    return state;
    }
}