import { createStore, combineReducers } from 'redux';
import user from '../reducers/user.reducer';
import auth from '../reducers/auth.reducer';
import post from '../reducers/post.reducer'

const store = createStore(
    combineReducers({ user, auth, post })
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;