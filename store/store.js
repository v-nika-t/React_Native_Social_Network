import { createStore, combineReducers } from 'redux';
import user from '../reducers/user.reducer';
import auth from '../reducers/auth.reducer';
import post from '../reducers/post.reducer';
import users from '../reducers/handleOfUsersByAdmin.reducer';

const store = createStore(
    combineReducers({ user, auth, post, users })
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;