import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return setProducts(state, action);

        default:
            return state;
    }
};

const setProducts = (state, action) => {
    const { products } = action;

    return [...products];
};

export default reducer;
