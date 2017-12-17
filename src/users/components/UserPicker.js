import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as fromUsers from '../users.actions';
import { getPositions, getSelectedUsers } from "../users.reducer";

const mapStateToProps = (state) => ({
    selectedUsers: getSelectedUsers(state),
    positions: getPositions(state)
});
const mapDispatchToProps = dispatch => ({
    cleanUser: (user) => dispatch(
        fromUsers.userUpdate(user.id, {playing: false, team: undefined, position: undefined})
    ),
    assignUser: (user, team, position) => dispatch(
        fromUsers.userAssign(user.id, {playing: true, team, position})
    ),
});

@connect(mapStateToProps, mapDispatchToProps)
class UserPicker extends React.Component {
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
        const { team, position, cleanUser, assignUser, users } = this.props;
        if (currentUser) {
            cleanUser(currentUser);
        }
        const newUser = users.find(u => u.id === eventKey);
        assignUser(newUser, team, position);
    };

    render() {
        const { team, position, positions } = this.props;
        const user = positions[team][position];

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

export default UserPicker;
