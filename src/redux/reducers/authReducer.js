import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isUserLogin: false,
    isUserAlreadyRegister: false,
    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return userLogin(state, action);

        case actionTypes.USER_REGISTER:
            return userRegister(state, action);

        case actionTypes.USER_LOGOUT:
            return userLogout(state, action);

        default:
            return state;
    }
};

const userLogin = (state, action) => {
    return {
        ...state,
        isUserLogin: true,
    };
};

const userRegister = (state, action) => {
    return {
        ...state,
        isUserLogin: false,
        users: [...state.users, action.user],
    };
};

const userLogout = (state, action) => {
    return {
        ...state,
        isUserLogin: false,
    };
};

export default reducer;
