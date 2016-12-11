import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => ({});

@connect(mapStateToProps, mapDispatchToProps)
class UserListHeader extends Component {
    render() {
        return (
            <thead>
            <tr>
                {
                    this.props.columns.map((column, i) => (
                        <th key={i} onClick={() => {}} style={{cursor: 'pointer'}}>
                            {column}
                        </th>
                    ))
                }
            </tr>
            </thead>
        )
    }
}
export default UserListHeader;