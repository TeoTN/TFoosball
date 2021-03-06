import React from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Icon from 'react-fontawesome';
import { getSelectedTeam } from '../../teams/teams.reducer';
import { isTeamAdmin } from "../../shared/auth/auth.reducer";


const mapStateToProps = (state) => ({
    teams: state.teams,
    isTeamAdmin: isTeamAdmin(state),
    selectedTeam: getSelectedTeam(state),
});

class ClubsLayout extends React.PureComponent {
    render() {
        const {
            children,
            isTeamAdmin,
        } = this.props;
        return (
            <div className="container-responsive">
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect} className="text-center">
                    <LinkContainer to={{pathname: `/clubs/joined`}}>
                        <NavItem eventKey="1" href="#">
                            <Icon name="users"/>
                            <p className="xs-text-small">My clubs</p>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: `/clubs/pending`}}>
                        <NavItem eventKey="2" href="#">
                            <Icon name="inbox"/>
                            <p className="xs-text-small">Pending</p>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: `/clubs/invite`}}>
                        <NavItem eventKey="3" href="#">
                            <Icon name="id-badge"/>
                            <p className="xs-text-small">Invite</p>
                        </NavItem>
                    </LinkContainer>
                    {isTeamAdmin && <LinkContainer to={{pathname: `/clubs/admin`}}>
                        <NavItem eventKey="4" href="#">
                            <Icon name="superpowers"/>
                            <p className="xs-text-small">Admin</p>
                        </NavItem>
                    </LinkContainer>}
                </Nav>
                <Panel>
                    {children}
                </Panel>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(ClubsLayout);
