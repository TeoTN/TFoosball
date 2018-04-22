import React from 'react';
import { Button, Row, Col, FormControl, Panel } from 'react-bootstrap';
import mapValues from 'lodash/mapValues';


class PlayResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blue: '',
            red: '',
        };
    }

    onInputChange = (team) => (event) => this.setState({[team]: event.target.value});

    onInputBlur = (team) => () => {
        const otherTeam = team === 'red' ? 'blue' : 'red';
        if (!this.state[otherTeam]) {
            this.setState({[otherTeam]: 10});
        }
    };

    handleFinish = () => {
        const {players, onPublish} = this.props;
        const requestData = {
            ...mapValues(players, player => player.username),
            red_score: this.state.red,
            blue_score: this.state.blue,
        };
        onPublish(requestData, this.clear);
    };

    clear = () => this.setState({blue: 0, red: 0,});

    render() {
        const {arePositionsSet} = this.props;
        return (
            <Panel className="ui-card with-vertical-margin">
                <Row>
                    <Col xs={12}>
                        <h3 style={{marginTop: 0}}>Score</h3>
                    </Col>
                    <Col xs={6} sm={4}>
                        <FormControl
                            style={{borderColor: '#3498db'}}
                            type="number"
                            placeholder="Blue score"
                            onChange={this.onInputChange('blue')}
                            onBlur={this.onInputBlur('blue')}
                            value={this.state.blue}
                        />
                    </Col>
                    <Col xsHidden sm={1}>
                        <h4>vs</h4>
                    </Col>
                    <Col xs={6} sm={4}>
                        <FormControl
                            style={{borderColor: '#e74c3c'}}
                            type="number"
                            placeholder="Red score"
                            onChange={this.onInputChange('red')}
                            onBlur={this.onInputBlur('red')}
                            value={this.state.red}
                        />
                    </Col>
                    <Col xs={12} sm={3}>
                        <Button
                            onClick={this.handleFinish}
                            bsStyle={'success'}
                            disabled={!arePositionsSet}
                            block>
                            Send
                        </Button>
                    </Col>
                </Row>
            </Panel>
        );
    }
}

export default PlayResult;
