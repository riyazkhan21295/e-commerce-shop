import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './redux/reducers/index';

import App from './App';

// import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.log(error);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;

        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();
const middlewares = [ReduxThunk];
const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));
store.subscribe(() => saveToLocalStorage(store.getState()));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
