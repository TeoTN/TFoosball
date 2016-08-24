import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserPicker from './UserPicker';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class FoosballTable extends Component {
    render() {
        const players = this.props.userList.filter(user => user.playing);
        return (
            <Col xs={5}>
                <UserPicker team={'blue'} pos={'def'} player={players[0]}/>
                <UserPicker team={'blue'} pos={'att'} player={players[1]}/>
                <UserPicker team={'red'} pos={'def'} player={players[2]}/>
                <UserPicker team={'red'} pos={'att'} player={players[3]}/>
                {players.map((p, i) => <p key={i}>{p.username} [{p.team}]</p>)}
                <Image src="/src/assets/img/table.jpg" rounded responsive />
            </Col>
        );
    }
}

export default FoosballTable;