import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Button, Panel, ButtonGroup } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const mapStateToProps = ({profile}) => ({profile});

@withRouter
@connect(mapStateToProps, null)
export default class ProfileLayout extends Component {
    render() {
        const { children, profile, params: {username}} = this.props;
        return (
            <div>
                <h1>Profile &nbsp;<small>{ username }</small></h1>
                <Panel>
                    <ButtonGroup>
                        <LinkContainer to={{ pathname: `/profile/${username}/stats`}}>
                            <Button bsSize="xsmall" bsStyle="info">Profile stats</Button>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: `/profile/${username}/matches`}}>
                            <Button bsSize="xsmall" bsStyle="info">Profile matches</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </Panel>
                { children ?
                    children :
                    <Row>
                        <ProfileStats profile={profile}/>
                        <ProfileChart profile={profile}/>
                    </Row>
                }
            </div>
        );
    }
}