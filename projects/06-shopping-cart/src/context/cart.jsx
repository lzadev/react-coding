import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = [];
const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case 'ADD_TO_CART': {
            const productInCartIndex = state.findIndex(item => item.id === actionPayload.id);
            if (productInCartIndex >= 0) {
                const newCart = [...state];
                newCart[productInCartIndex].quantity++;
                return newCart;
            }

            return [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
        }
        case 'REMOVE_FROM_CART': {
            return state.filter(item => item.id !== actionPayload.id);
        }
        case 'CLEAR_CART': {
            return initialState;
        }

    }
}



export function CartProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    }

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    return (
        <CartContext.Provider value={{ addToCart, clearCart, removeFromCart, cart: state }}>
            {children}
        </CartContext.Provider >
    )
}