import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const initialState = {};
const logger = createLogger();

const store = createStore(reducers, initialState, compose(applyMiddleware(thunk, logger)));

export default store;