import React from 'react';
import { Panel, Col, Table, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import MatchItem from './MatchItem';
import * as ModalActions from '../actions/modal.actions';
import * as MatchActions from '../actions/match.actions';

const mapStateToProps = ({ profile: { matches } }) => ({ matches, });
const mapDispatchToProps = (dispatch) => ({
    onRemove: (modalParams) => dispatch(ModalActions.showQuestionModal(modalParams)),
    remove: (id) => dispatch(MatchActions.remove(id)),
});

const ProfileMatches = ({ matches = [], onRemove, remove }) => {
    const askToRemove = (match) => (event) => {
        const params = {
            title: 'Are you sure?',
                heading: 'You are about to remove the following match:',
            text: `${match.id}) ${match.red_def} ${match.red_att} [${match.red_score} - ${match.blue_score}] \
                   ${match.blue_att} ${match.blue_def}`,
            onAccept: () => remove(match.id),
        };
        onRemove(params);
        event.preventDefault();
    };

    return (
        <Panel>
            <h4>Matches</h4>
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
                    <Col xs={2} componentClass="td">
                        <strong> Options </strong>
                    </Col>
                </Row>
                </thead>
                <tbody>
                { matches.map((match, idx) => <MatchItem key={idx} {...match} onRemove={askToRemove}/>)}
                </tbody>
            </Table>
        </Panel>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMatches);
