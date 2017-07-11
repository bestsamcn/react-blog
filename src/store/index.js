import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import createLogger from 'redux-logger';
import common from './reducers/common';
import admin from './reducers/admin';

const blog = combineReducers({
    common,
    admin
});

const store = createStore(
  blog,
  applyMiddleware(thunkMiddleware, sequenceAction)
);

// const createStoreWithMiddleware = applyMiddleware(
//     sequenceAction,
//     thunkMiddleware
// )(createStore);
// const store = createStoreWithMiddleware(blog);
export default store;

