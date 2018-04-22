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

class ProfileMatches extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            deleteMode: false,
        };
    }

    switchDeleteMode = ({target: {checked}}) => {
        this.setState({deleteMode: checked});
    };

    askToRemove = (match) => (event) => {
        const {onRemove, remove} = this.props;
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

    render() {
        const { matches = defaultData, params: {username} } = this.props;
        const { deleteMode } = this.state;
        return (
            <Panel>
                <NaivePager page={matches.page} prefix={`/profile/${username}/matches`} totalPages={matches.totalPages} />
                {
                    matches.list ?
                        <MatchList
                            onRemove={this.askToRemove}
                            matches={matches.list}
                            username={username}
                            count={matches.count}
                            withOptions={deleteMode}
                            switchDeleteMode={this.switchDeleteMode}
                            signed={true}
                        /> :
                        <Loading />
                }
                <NaivePager page={matches.page} prefix={`/profile/${username}/matches`} totalPages={matches.totalPages} />
            </Panel>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMatches)
