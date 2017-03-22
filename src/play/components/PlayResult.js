import React from 'react';
import { Button, Row, Col, FormControl } from 'react-bootstrap';


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
        const { players, onPublish } = this.props;
        const requestData = {
            ...(players.reduce((o, p) => Object.assign(o, {[`${p.team}_${p.position}`]: p.username}), {})),
            red_score: this.state.red,
            blue_score: this.state.blue,
        };
        onPublish(requestData, this.clear);
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
                    style={{ borderColor: '#3498db' }}
                    type="number"
                    placeholder="Blue"
                    onChange={this.onInputChange('blue')}
                    value={this.state.blue}
                />
            </Col>
            <Col xsHidden sm={1}>
                <h4>vs</h4>
            </Col>
            <Col sm={4}>
                <FormControl
                    style={{ borderColor: '#e74c3c' }}
                    type="number"
                    placeholder="Red"
                    onChange={this.onInputChange('red')}
                    value={this.state.red}
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
