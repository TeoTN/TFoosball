import React from 'react';
import {ListGroup, ListGroupItem, Col, Button} from 'react-bootstrap';
import MatchItem from './MatchItem';


export default class MatchList extends React.Component {
    getMatchItem = () => {
        const { withOptions, onRemove, username, signed } = this.props;
        return (match, idx) => (
            <MatchItem
                key={idx}
                username={username}
                match={match}
                withOptions={withOptions}
                onRemove={onRemove}
            />
        );
    };

    render() {
        const {matches, count, switchDeleteMode} = this.props;

        return (
            <ListGroup componentClass="ul">
                { matches.map(this.getMatchItem()) }
                <ListGroupItem className="text-primary text-right">
                    <Button bsSize="xs" bsStyle="danger" onClick={switchDeleteMode} className="with-horizontal-margin">
                        Toggle delete
                    </Button>
                    <strong>Total matches: { count }</strong>
                </ListGroupItem>
            </ListGroup>
        );

    };
}
