import React, {Component} from 'react';
import {Table, Grid, Row, Col, Pagination, Pager} from 'react-bootstrap';
import {connect} from 'react-redux';
import MatchItem from './MatchItem';
import { browserHistory } from 'react-router';

const mapStateToProps = ({matches}) => ({
    matches,
});

@connect(mapStateToProps, null)
export default class MatchesLayout extends Component {
    renderPager() {
        const {matches: {page, totalPages}} = this.props;
        return (
            <Pager>
                {
                    page > 1 ?
                        <Pager.Item previous href={`/matches/${page-1}`}>&laquo; Previous Page</Pager.Item> :
                        null
                }
                {
                    page < totalPages ?
                        <Pager.Item next href={`/matches/${page + 1}`}>Next Page &raquo;</Pager.Item> :
                        null
                }
            </Pager>
        );
    }
    render() {
        const { matches } = this.props;

        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>Matches</h1>
                    </Col>
                    {this.renderPager()}
                </Row>
                <Row>
                    <Col>
                        <Table striped hover>
                            <thead>
                            <Row componentClass="tr">
                                <Col xs={4} className="align-r" componentClass="td">
                                    <strong> Red team </strong>
                                </Col>
                                <Col xs={1} componentClass="td">
                                    <strong> Score </strong>
                                </Col>
                                <Col xs={4} componentClass="td">
                                    <strong> Blue team </strong>
                                </Col>
                                <Col xs={1} componentClass="td">
                                    <strong> EXP </strong>
                                </Col>
                            </Row>
                            </thead>
                            <tbody>
                            { matches.list.map((match, idx) => <MatchItem key={idx} {...match} withOptions={false} />)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    {this.renderPager()}
                </Row>
            </Grid>
        );
    };
}
