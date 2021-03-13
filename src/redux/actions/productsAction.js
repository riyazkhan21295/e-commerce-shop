import * as actionTypes from './actionTypes';

export const setProducts = (products = []) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products,
    };
};
