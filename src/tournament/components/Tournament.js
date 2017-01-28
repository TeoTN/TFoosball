import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TournamentRound from './TournamentRound';
export default class Tournament extends Component {
    getRounds() {
        // TODO Ensure not more than 2^6 players
        return this.props.data.rounds.map(
            (round, index) => {
                const pad = Math.pow(2, index)  * 60 - 60;
                return (<Col sm={2} key={index} style={{'marginTop': `-${pad}px`}}>
                    <TournamentRound data={round} roundNo={index}/>
                </Col>)
            }
        )
    }
    render() {
        return (
            <Grid>
                <Row>
                    {this.getRounds()}
                </Row>
            </Grid>
        );
    }
}