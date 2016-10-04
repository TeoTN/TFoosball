import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class UserPicker extends Component {
    getUsersOptions = () => this.props.users.map(
        (user, index) => (
            <MenuItem eventKey={user.id} key={index}> {user.username} </MenuItem>
        )
    );

    getTitle = user => user ? user.username : '-----';

    getColor = team => team === 'blue' ? 'info' : 'danger';

    render() {
        const { team, position, users } = this.props;
        const user = users.find(u => u.team === team && u.position === position);

        return (
            <DropdownButton bsStyle={this.getColor(team)} title={this.getTitle(user)}
                            id={`player-${team}-${position}`} onSelect={this.props.handleChange}>
                {this.getUsersOptions()}
            </DropdownButton>
        );
    }
}

export default UserPicker;
