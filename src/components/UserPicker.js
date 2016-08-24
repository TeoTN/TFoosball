import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class UserPicker extends Component {
    getUsersOptions = () => {
        return this.props.userList.map(
            (user, index) => (
                <MenuItem eventKey={user.id} active={user.playing} key={index}>
                    {user.username}
                </MenuItem>
            )
        );
    };

    chooseValue = () => {};

    getTitle = () => (this.props.player)?this.props.player.username:'-----';

    getColor = () => this.props.team === 'blue' ? 'info' : 'danger';

    render() {
        const {team, pos} = this.props;
        return (
            <DropdownButton bsStyle={this.getColor()} title={this.getTitle()}
                            id={`player-${team}-${pos}`} onSelect={this.chooseValue}>
                {this.getUsersOptions()}
            </DropdownButton>
        );
    }
}

export default UserPicker;
