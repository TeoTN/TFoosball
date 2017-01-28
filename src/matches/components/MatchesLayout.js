import React from 'react';
import {Grid, Row, Col, Pager} from 'react-bootstrap';
import {connect} from 'react-redux';
import MatchList from './MatchList';

const mapStateToProps = ({matches}) => ({
    matches,
});

@connect(mapStateToProps, null)
export default class MatchesLayout extends React.Component {
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
                        <MatchList matches={matches.list} />
                    </Col>
                </Row>
                <Row>
                    {this.renderPager()}
                </Row>
            </Grid>
        );
    };
}
