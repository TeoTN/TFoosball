import React from 'react'
import {Row, Col, Label, Panel} from 'react-bootstrap';
import Gravatar from '../../profile/components/Gravatar';

const WinnersStand = ({ winners }) => {
    const Face = ({user: {email, username, exp}, ...props}) => (
        <Col {...props}>
            <Gravatar email={email} />
            <h4 className="h4"><Label bsStyle="success">{username}</Label></h4>
            <span className="h6">{exp}XP</span>
        </Col>
    );
    return (
        winners.length === 3 ?
        <Row className="winners-stand text-center ui-card" componentClass={Panel}>
            <Col xs={12}> <h3>Top players</h3> </Col>
            <Face xs={4} smOffset={3} sm={2} user={winners[0]} />
            <Face xs={4} sm={2} user={winners[1]} />
            <Face xs={4} sm={2} user={winners[2]} />
        </Row> :
        null
    );
};

export default WinnersStand;
