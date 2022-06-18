import {combineReducers} from 'redux';

import userReducer from './userReducer/userReducer';

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;
