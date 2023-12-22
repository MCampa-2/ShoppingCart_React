import { useContext, useReducer, useEffect,createContext } from "react";
import { reducer, calculateTotal } from "./reducer";
import { CLEAR_CART,REMOVE,DECREASE,INCREASE,DISPLAY_ITEMS,LOADING } from "./actions";
import cartItems from "./data";



const AppContext = createContext();

const initialState = {
    loading: false,
    cart: new Map(cartItems.map((item) => [item.id, item]))
};



export const AppProvider = ({children}) =>{

   
    const [state, dispatch] = useReducer(reducer, initialState);

    calculateTotal(state.cart);

    const clearCart = () =>{
        dispatch({type: CLEAR_CART});
    }

    const removeItem = (id) =>{
       dispatch({type: REMOVE, payload: {id}});
    }

    const increaseItem = (id) =>{
        dispatch({type: INCREASE, payload: {id}});
    }

    const decreaseItem = (id) =>{
        dispatch({type: DECREASE, payload: {id}});
    }

    return(
        <AppContext.Provider value={{...state, clearCart, removeItem, decreaseItem, increaseItem}}>
            {children}
        </AppContext.Provider>
    )

};

export const useGlobalContext = () =>{
    return useContext(AppContext);
}