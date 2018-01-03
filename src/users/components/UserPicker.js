import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as fromUsers from '../users.actions';
import { getUsersPlaying, getSelectedUsers } from "../users.reducer";

const mapStateToProps = (state) => ({
    selectedUsers: getSelectedUsers(state),
    players: getUsersPlaying(state)
});
const mapDispatchToProps = (dispatch, {team, position}) => ({
    userAssign: user => dispatch(fromUsers.userAssign(user, team, position)),
});

class UserPicker extends React.PureComponent {
    getUsersOptions = () => {
        const { selectedUsers } = this.props;
        const selectedUsersList = Object.values(selectedUsers);
        return selectedUsersList.length === 0 ?
            <MenuItem disabled>No players selected</MenuItem> :
            selectedUsersList.map(
                (user, idx) => (
                    <MenuItem eventKey={user.id} key={idx}> {user.username} </MenuItem>
                )
            );
    };

    getTitle = user => user ? user.username : '-----';

    getColor = team => team === 'blue' ? 'info' : 'danger';

    handleChange = (currentUser) => (eventKey) => {
        const { userAssign, selectedUsers } = this.props;
        userAssign(selectedUsers[eventKey]);
    };

    render() {
        const { team, position, players } = this.props;
        const user = players[`${team}_${position}`];
        return (
            <DropdownButton
                bsStyle={this.getColor(team)}
                title={this.getTitle(user)}
                id={`player-${team}-${position}`}
                onSelect={this.handleChange(user)}>
                <MenuItem header>{position.toUpperCase()}</MenuItem>
                {this.getUsersOptions()}
            </DropdownButton>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPicker);
