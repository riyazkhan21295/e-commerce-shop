import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import checkoutReducer from './checkoutReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    checkout: checkoutReducer,
    auth: authReducer,
});

export default rootReducer;
