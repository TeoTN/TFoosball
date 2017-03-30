import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import MatchList from '../../matches/components/MatchList';
import * as ModalActions from '../../shared/modal.actions';
import * as MatchActions from '../../matches/match.actions';
import NaivePager from '../../shared/components/NaivePager';
import Loading from '../../shared/components/Loading';
import { defaultData } from '../../matches/matches.reducer';

const mapStateToProps = ({ profile: { matches } }) => ({ matches });
const mapDispatchToProps = (dispatch) => ({
    onRemove: (modalParams) => dispatch(ModalActions.showQuestionModal(modalParams)),
    remove: (id) => dispatch(MatchActions.remove(id)),
});

const ProfileMatches = ({ matches = defaultData, onRemove, remove, params: {username} }) => {
    const askToRemove = (match) => (event) => {
        const params = {
            title: 'Are you sure?',
                heading: 'You are about to remove the following match:',
            text: `${match.id}) ${match.red_def} ${match.red_att} [${match.red_score} - ${match.blue_score}] \
                   ${match.blue_att} ${match.blue_def}`,
            onAccept: () => remove(match.id),
            onReject: () => {},
        };
        onRemove(params);
        event.preventDefault();
    };
    return (
        <Panel>
            <h4>Matches</h4>
            <NaivePager page={matches.page} prefix={`/profile/${username}/matches`} totalPages={matches.totalPages} />
            {
                matches.list ?
                    <MatchList
                        onRemove={askToRemove}
                        matches={matches.list}
                        username={username}
                        count={matches.count}
                        withOptions
                    /> :
                    <Loading />
            }
        </Panel>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMatches);
