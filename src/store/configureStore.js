import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
const reducers = {
    app: appReducer,
    form: formReducer
};
const reducer = combineReducers(reducers);

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk, logger)
    );
}