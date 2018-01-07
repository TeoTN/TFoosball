import React from 'react'
import { Table } from 'react-bootstrap';
import { JoinTeamForm, SelectTeamItem } from './index';
import { connect } from "react-redux";
import { changeDefault, leaveTeam, selectTeam } from "../teams.actions";
import { showQuestionModal } from "../../shared/modal.actions";
import GlyphButton from "../../shared/components/GlyphButton";
import PanelHeader from "../../shared/PanelHeader";


const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(selectTeam(team)),
    leaveTeam: (team) => dispatch(leaveTeam(team)),
    showModal: (modalParams) => dispatch(showQuestionModal(modalParams)),
    makeDefault: (team) => dispatch(changeDefault(team.id)),
});

class TeamList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            joining: false,
            adding: false,
        };
    }

    leaveTeam = (team) => {
        const {showModal, leaveTeam} = this.props;
        showModal({
            title: 'Are you sure?',
            text: `You are about to leave team ${team.name}. Proceed?`,
            onAccept: () => leaveTeam(team),
            onReject: () => {
            },
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
            onReject: () => {
            },
        });
    };

    onJoin = () => {
        const {joining, adding} = this.state;
        this.setState({joining: !joining, adding: !joining ? false : adding});
    };

    onAdd = () => {
        const {joining, adding} = this.state;
        this.setState({adding: !adding, joining: !adding ? false : joining});
    };

    render() {
        const {teams: {joined = [], selected}, defaultTeam} = this.props;
        const {joining, adding} = this.state;

        return (
            <React.Fragment>
                <PanelHeader title="Clubs dashboard" glyph="users" isAwesome>
                    <GlyphButton bsStyle="success" bsSize="small" glyph="plus" onClick={this.onAdd}>
                        Create a club
                    </GlyphButton>
                    <GlyphButton bsStyle="success" bsSize="small" glyph="log-in" onClick={this.onJoin}>
                        Join a club
                    </GlyphButton>
                </PanelHeader>
                <Table hover>
                    <thead>
                    <tr className="club-item">
                        <th scope='col'>Club name</th>
                        <th scope='col'>Nickname</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        joined.map((team) =>
                            <SelectTeamItem
                                key={team.id}
                                team={team}
                                onSelect={this.props.selectTeam}
                                onLeave={this.leaveTeam}
                                onMakeDefault={this.makeTeamDefault}
                                isSelected={selected === team.id}
                                isDefault={defaultTeam === team.id}
                            />
                        )
                    }
                    </tbody>
                </Table>
                {joining && <JoinTeamForm/>}
                {adding && <span>Create new club</span>}
            </React.Fragment>
        );
    }
}

export default connect(null, mapDispatchToProps)(TeamList)
