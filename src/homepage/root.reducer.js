import users from '../users/users.reducer';
import notifications from '../shared/notifier.reducer';
import profile from '../profile/profile.reducer';
import tournaments from '../tournament/tournaments.reducer';
import auth from '../shared/auth/auth.reducer';
import ranking from '../ranking/ranking.reducer';
import modal from '../shared/modal.reducer';
import matches from '../matches/matches.reducer';
import play from '../play/play.reducer';
import teams from '../shared/teams/teams.reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    users,          // Current users list from API general view
    notifications,  // List of info/error messages to be displayed to users
    profile,        // Currently viewed profile (NOT a current user profile!)
    tournaments,    // Tournaments
    auth,           // Auth state, including current user profile (NOT a viewed one)
    ranking,        // Ranking metadata
    modal,          // A modal message to be shown currently
    matches,        // A state for matches list
    play,           // Currently played match
    teams,          // Available teams
});

export default reducer;
