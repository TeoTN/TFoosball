import React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Icon from 'react-fontawesome';
import ReactMarkdown from 'react-markdown';
import moment from "moment";
import { Loading } from "../../shared/components";
import { getEventsState } from "../teams.reducer";


const mapStateToProps = (state) => ({
    events: getEventsState(state),
});

const mapEventToIcon = {
    match: 'gamepad',
    joined: 'user-plus',
    invitation: 'id-badge',
};

const EventItem = (event, idx) => (
    <ListGroupItem key={idx}>
        <h6 className="text-success">
            <Icon name={mapEventToIcon[event.type]}/>{moment(event.date).fromNow()}
        </h6>
        <ReactMarkdown source={event.event}/>
    </ListGroupItem>
);

class EventFeed extends React.PureComponent {
    render() {
        const {events} = this.props;
        const areEventsEmpty = !events.loading && events.list.length === 0;
        return (
            <ListGroup className="event-feed">
                {events.loading && <ListGroupItem><Loading/></ListGroupItem>}
                {areEventsEmpty && <ListGroupItem>No recent events</ListGroupItem>}
                {!areEventsEmpty && events.list.map(EventItem)}
            </ListGroup>
        );
    }
}

export default connect(mapStateToProps, null)(EventFeed);
