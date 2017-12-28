import React from 'react'
import { ListGroup, Row } from 'react-bootstrap';
import { SelectTeamItem, JoinTeamItem } from './index';
import { connect } from "react-redux";
import { leaveTeam, selectTeam } from "../teams.actions";
import { showQuestionModal } from "../../shared/modal.actions";
import Switch from "../../shared/components/Switch";

const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(selectTeam(team)),
    leaveTeam: (team) => dispatch(leaveTeam(team)),
    showModal: (modalParams) => dispatch(showQuestionModal(modalParams)),
});

@connect(null, mapDispatchToProps)
export default class TeamList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            joinable: false,
            editable: false,
        };
    }

    onTeamSelect = (team) => {
        const {selectTeam, leaveTeam, showModal} = this.props;
        if (this.state.editable) {
            showModal({
                title: 'Are you sure?',
                text: `You are about to leave team ${team.name}. Proceed?`,
                onAccept: () => leaveTeam(team),
                onReject: () => {
                },
            });
        } else {
            selectTeam(team);
        }
    };

    toggleMode = (mode) => ({target: {checked}}) => {
        this.setState({[mode]: checked})
    };

    render() {
        const {teams: {joined = [], selected}} = this.props;
        const {joinable, editable} = this.state;
        return (
            <div> {/* TODO Migrate to React.Fragment */}
                <Row className="with-vertical-margin">
                    <Switch bsStyle="success" onChange={this.toggleMode('joinable')}>Join club mode</Switch>
                    <Switch bsStyle="danger" onChange={this.toggleMode('editable')}>Leave club mode</Switch>
                </Row>
                <ListGroup fill>
                    {joinable ? <JoinTeamItem/> : null}
                    {
                        joined.map((team) =>
                            <SelectTeamItem
                                key={team.id}
                                team={team}
                                onSelect={() => this.onTeamSelect(team)}
                                selected={selected === team.id}
                                editable={editable}
                            />
                        )
                    }
                </ListGroup>
            </div>
        );
    }
}
