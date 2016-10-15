import users from './users.reducer';
import errorList from './error.reducer';
import profile from './profile.reducer';
import tournaments from './tournaments.reducer';
import auth from './auth.reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    users,
    errorList,
    profile,
    tournaments,
    auth,
});
export default reducer;
