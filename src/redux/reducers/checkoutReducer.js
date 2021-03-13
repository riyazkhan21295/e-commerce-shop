import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return addToCart(state, action);

        case actionTypes.REMOVE_FROM_CART:
            return removeFromCart(state, action);

        case actionTypes.INCREMENT_CART_ITEM:
            return incrementCartItem(state, action);

        case actionTypes.DECREMENT_CART_ITEM:
            return decrementCartItem(state, action);

        case actionTypes.CLEAR_CART_ITEMS:
            return clearCartItems(state, action);

        case actionTypes.PLACE_ORDER:
            return placeOrder(state, action);

        default:
            return state;
    }
};

const addToCart = (state, action) => {
    const product = state.find(({ id }) => +id === +action.product.id);
    if (product) return state;

    return [...state, action.product];
};

const removeFromCart = (state, action) => {
    return state.filter(({ id }) => +id !== +action.productId);
};

const incrementCartItem = (state, action) => {
    const productIndex = state.findIndex(({ id }) => +id === +action.productId);

    const newState = [...state];
    newState[productIndex].quantity = +(newState[productIndex].quantity || 0) + 1;

    return newState;
};

const decrementCartItem = (state, action) => {
    const productIndex = state.findIndex(({ id }) => +id === +action.productId);

    const newState = [...state];
    newState[productIndex].quantity = +(newState[productIndex].quantity || 0) - 1;

    if (newState[productIndex].quantity === 0) return removeFromCart(state, action);

    return newState;
};

const clearCartItems = (state, action) => {
    return [];
};

const placeOrder = (state, action) => {
    console.log('Placed Order: ', state);
    return [];
};

export default reducer;
