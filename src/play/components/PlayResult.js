import React from 'react';
import { connect } from 'react-redux';
import * as MatchActions from '../../matches/match.actions';
import { Button, Row, Col, FormControl } from 'react-bootstrap';

const mapStateToProps = ({users}) => ({users});
const mapDispatchToProps = (dispatch) => ({
    publish: (data, callback) => dispatch(MatchActions.publish(data, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
class PlayResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blue: 0,
            red: 0,
        };
    }

    onInputChange = (team) => (event) => this.setState({ [team]: event.target.value });

    handleFinish = () => {
        const { users, publish } = this.props;
        const players = users.filter(u => u.playing);
        const requestData = {
            ...(players.reduce((o, p) => Object.assign(o, {[`${p.team}_${p.position}`]: p.username}), {})),
            red_score: this.state.red,
            blue_score: this.state.blue,
        };
        publish(requestData, this.clear);
    };

    clear = () => this.setState({ blue: 0, red: 0, });

    render() {
        return (
        <Row>
            <Col xs={12}>
                <h3>Score</h3>
            </Col>
            <Col sm={4}>
                <FormControl
                    style={{ borderColor: '#e74c3c' }}
                    type="text"
                    placeholder="Red"
                    onChange={this.onInputChange('red')}
                    value={this.state.red}
                />
            </Col>
            <Col xsHidden sm={1}>
                <h4>vs</h4>
            </Col>
            <Col sm={4}>
                <FormControl
                    style={{ borderColor: '#3498db' }}
                    type="text"
                    placeholder="Blue"
                    onChange={this.onInputChange('blue')}
                    value={this.state.blue}
                />
            </Col>
            <Col sm={3}>
                <Button onClick={this.handleFinish} bsStyle={'success'} block>
                    Send
                </Button>
            </Col>
        </Row>
        );
    }
}

export default PlayResult;
