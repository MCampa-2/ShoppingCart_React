
import { CLEAR_CART,REMOVE,DECREASE,INCREASE,DISPLAY_ITEMS,LOADING } from "./actions";


export const calculateTotal = (cart) =>{
    let totalCost = 0;
    for(let [itemId,item] of cart){
        totalCost += item.amount * parseFloat(item.price);
    }
    return totalCost.toFixed(2);
}

export const totalAmount = (cart) =>{
    let totalCartAmount = 0;
    for(const [itemId, item] of cart){
        totalCartAmount += item.amount;
    }
    return totalCartAmount;
}

 
export const reducer = (state,action) =>{
    if(action.type === CLEAR_CART){
        return {...state, cart: new Map()}
    }
    if(action.type === REMOVE){
        const removeItem = new Map(state.cart);
        removeItem.delete(action.payload.id);
        return {...state, cart: removeItem}
    }
    if(action.type === INCREASE){
        const newCart = new Map(state.cart);
        const itemId = action.payload.id;
        const item = newCart.get(itemId);
        const newItem = {...item, amount: item.amount + 1};
        newCart.set(itemId, newItem);
        return {...state, cart: newCart}
    }
    if(action.type === DECREASE){
        const newCart = new Map(state.cart);
        const itemId = action.payload.id;
        const item = newCart.get(itemId);
         if(item.amount === 1){
            newCart.delete(itemId);
            return {...state, cart: newCart}
         }
         const newItem = {...item, amount: item.amount - 1};
         newCart.set(itemId, newItem);
         return {...state, cart: newCart};
    }
}
