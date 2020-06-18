import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootreducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootreducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

