import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userUpdate } from '../actions/user.actions';

const mapStateToProps = ({users}) => ({
    users: users.filter(u => u.selected),
});
const mapDispatchToProps = dispatch => ({
    cleanUser: (user) => dispatch(
        userUpdate(user.id, {playing: false, team: undefined, position: undefined})
    ),
    assignUser: (user, team, position) => dispatch(
        userUpdate(user.id, {playing: true, team, position})
    ),
});

@connect(mapStateToProps, mapDispatchToProps)
class UserPicker extends Component {
    getUsersOptions = () => {
        const { users } = this.props;
        return users.length === 0 ?
            <MenuItem disabled>No players selected</MenuItem> :
            users.map(
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
        const { team, position, users } = this.props;
        const user = users.find(u => u.team === team && u.position === position);

        return (
            <DropdownButton bsStyle={this.getColor(team)} title={this.getTitle(user)}
                            id={`player-${team}-${position}`} onSelect={this.handleChange(user)}>
                {this.getUsersOptions()}
            </DropdownButton>
        );
    }
}

export default UserPicker;
