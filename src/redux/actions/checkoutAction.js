import * as actionTypes from './actionTypes';

export const addToCart = product => {
    return {
        type: actionTypes.ADD_TO_CART,
        product,
    };
};

export const removeFromCart = productId => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        productId,
    };
};

export const incrementCartItem = productId => {
    return {
        type: actionTypes.INCREMENT_CART_ITEM,
        productId,
    };
};

export const decrementCartItem = productId => {
    return {
        type: actionTypes.DECREMENT_CART_ITEM,
        productId,
    };
};

export const clearCartItems = () => {
    return {
        type: actionTypes.CLEAR_CART_ITEMS,
    };
};

export const placeOrder = () => {
    return {
        type: actionTypes.PLACE_ORDER,
    };
};
