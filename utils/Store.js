import {createContext, useReducer} from "react";
import Cookies from "js-cookie";

const initialState = {
    darkMode: Cookies.get("darkMode") === "ON",
    cart: {
        cartItems: Cookies.get("cartItem") ? JSON.parse(Cookies.get("cartItem")) : [],
        shippingAddress: Cookies.get("shippingAddress") ? JSON.parse(Cookies.get("shippingAddress")) : {},
        paymentMethod: Cookies.get("paymentMethod") ? Cookies.get('paymentMethod'): ''
    },
    userInfo: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null
}

export const Store = createContext(initialState);

function reducer(state, actions) {
    switch (actions.type) {
        case 'DARK_MODE_ON':
            return {...state, darkMode: !state.darkMode};
        case 'DARK_MODE_OFF':
            return {...state, darkMode: !state.darkMode};
        case "CART_ADD_ITEM": {
            const newItem = actions.payload;
            const exitItem = state.cart.cartItems.find(item => item._id === newItem._id);
            const cartItems = exitItem
                ? state.cart.cartItems.map(item => item.name === exitItem.name ? newItem : item)
                : [...state.cart.cartItems, newItem];
            Cookies.set("cartItem", JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems}};
        }
        case "CART_REMOVE_ITEM": {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== actions.payload._id);
            Cookies.set("cartItem", JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems}};
        }
        case 'SAVE_SHIPPING_ADDRESS':
            return {...state, cart: {...state.cart, shippingAddress: actions.payload}}
        case 'SAVE_PAYMENT_METHOD':
            return {...state, cart: {...state.cart, paymentMethod: actions.payload}}
        case "USER_LOGIN": {
            return {...state, userInfo: actions.payload}
        }
        case "USER_REGISTER": {
            return {...state, userInfo: actions.payload}
        }
        case 'USER_LOGOUT':
            return {...state, userInfo: null, cart: {cartItems: []}}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Store.Provider value={{state, dispatch}}>
        {props.children}
    </Store.Provider>
}
