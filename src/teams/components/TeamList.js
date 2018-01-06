import React from 'react'
import { Button, ButtonToolbar, Glyphicon, Table } from 'react-bootstrap';
import { SelectTeamItem } from './index';
import { connect } from "react-redux";
import { leaveTeam, selectTeam } from "../teams.actions";
import { showQuestionModal } from "../../shared/modal.actions";

const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(selectTeam(team)),
    leaveTeam: (team) => dispatch(leaveTeam(team)),
    showModal: (modalParams) => dispatch(showQuestionModal(modalParams)),
    makeDefault: () => {},
});

class TeamList extends React.PureComponent {
    leaveTeam = (team) => {
        const {showModal, leaveTeam} = this.props;
        showModal({
            title: 'Are you sure?',
            text: `You are about to leave team ${team.name}. Proceed?`,
            onAccept: () => leaveTeam(team),
            onReject: () => {},
        });
    };

    makeTeamDefault = (team) => {
        const {showModal, makeDefault} = this.props;
        showModal({
            title: 'Default club',
            text: (
                <span>
                    This will make `{team.name}` your default club.
                    It will be selected when you login to the page.<br/><br/>
                    Do you want to proceed?
                </span>
            ),
            onAccept: () => makeDefault(team),
            onReject: () => {},
        });
    };

    render() {
        const {teams: {joined = [], selected}} = this.props;
        return (
            <div> {/* TODO Migrate to React.Fragment */}
                <ButtonToolbar className="pull-right">
                    <Button bsStyle="success" bsSize="xsmall">
                        <Glyphicon glyph="plus"/>&nbsp;Join club
                    </Button>
                </ButtonToolbar>
                <Table hover>
                    <thead>
                    <tr className="club-item">
                        <th scope='col'>Club name</th>
                        <th scope='col'>Member name</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{joinable ? <JoinTeamItem/> : null}*/}
                    {
                        joined.map((team) =>
                            <SelectTeamItem
                                key={team.id}
                                team={team}
                                onSelect={this.props.selectTeam}
                                onLeave={this.leaveTeam}
                                onMakeDefault={this.makeTeamDefault}
                                isSelected={selected === team.id}
                                isDefault={-1 === team.id}
                            />
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(TeamList)
