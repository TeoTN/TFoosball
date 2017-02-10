import React from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import MatchItem from './MatchItem';

export default class MatchList extends React.Component {
    render() {
        const { matches, withOptions, onRemove } = this.props;

        return (
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
                    {
                        withOptions ?
                        <Col xs={2} componentClass="td">
                            <strong> Options </strong>
                        </Col> :
                        null
                    }
                </Row>
                </thead>
                <tbody>
                    {
                        matches.map((match, idx) =>
                            <MatchItem key={idx} {...match} withOptions={withOptions} onRemove={onRemove} />
                        )
                    }
                </tbody>
            </Table>
        );
    };
}
