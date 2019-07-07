import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import peopleReducer from './reducers/appReducer';
export default function configureStore(initialState={}) {
    return createStore(
        peopleReducer,
        applyMiddleware(thunk)
    );
};