import * as actionTypes from './actionTypes';

export const userLogin = () => {
    return {
        type: actionTypes.USER_LOGIN,
    };
};

export const userRegister = user => {
    return {
        type: actionTypes.USER_REGISTER,
        user,
    };
};

export const userLogout = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    };
};
