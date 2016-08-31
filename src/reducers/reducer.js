import userList from './users.reducer';
import errorList from './error.reducer';
import profile from './profile.reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    userList,
    errorList,
    profile,
});
export default reducer;
