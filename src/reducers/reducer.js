import users from './users.reducer';
import errorList from './error.reducer';
import infoList from './infobar.reducer';
import profile from './profile.reducer';
import tournaments from './tournaments.reducer';
import auth from './auth.reducer';
import ranking from './ranking.reducer';
import modal from './modal.reducer';
import matches from './matches.reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    users,          // Current users list from API general view
    errorList,      // List of error messages to be displayed to users
    infoList,       // List of info/success messages to be displayed to users
    profile,        // Currently viewed profile (NOT a current user profile!)
    tournaments,    // Tournaments
    auth,           // Auth state, including current user profile (NOT a viewed one)
    ranking,        // Ranking metadata
    modal,          // A modal message to be shown currently
    matches,        // A state for matches list
});

export default reducer;
