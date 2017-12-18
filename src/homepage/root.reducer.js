import users from '../users/users.reducer';
import notifications from '../shared/notifier.reducer';
import profile from '../profile/profile.reducer';
import tournaments from '../tournament/tournaments.reducer';
import auth from '../shared/auth/auth.reducer';
import modal from '../shared/modal.reducer';
import matches from '../matches/matches.reducer';
import play from '../play/play.reducer';
import teams from '../teams/teams.reducer';
import { reducer as form } from 'redux-form'
import { combineReducers } from 'redux';

const reducer = combineReducers({
    users,   // Current users list from API general view
    notifications,  // List of info/error messages to be displayed to users
    profile,        // Currently viewed profile (NOT a current user profile!)
    tournaments,    // Tournaments
    auth,           // Auth state, including current user profile (NOT a viewed one)
    modal,          // A modal message to be shown currently
    matches,        // A state for matches list
    play,           // Currently played match
    teams,          // Available teams
    form,           // Current state of forms across the app
});

export default reducer;
