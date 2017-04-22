import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import MatchItem from './MatchItem';
import Switch from '../../shared/components/Switch';


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
                signed={signed}
            />
        );
    };

    render() {
        const {matches, count, switchDeleteMode} = this.props;

        return (
            <ListGroup componentClass="ul">
                { matches.map(this.getMatchItem()) }
                <ListGroupItem className="text-primary text-right">
                    <Switch bsStyle="danger" onChange={switchDeleteMode}>Delete mode</Switch>
                    <strong className="with-horizontal-margin">Total matches: { count }</strong>
                </ListGroupItem>
            </ListGroup>
        );

    };
}
