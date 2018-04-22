import React from 'react';
import Tournament from './Tournament';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state});

class TournamentLayout extends React.PureComponent {
    render() {
        const {tid} = this.props.params;
        return (
            <div>
                <h1>Tournament #{tid}</h1>
                <Tournament data={this.props.tournaments[tid]} />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(TournamentLayout);
