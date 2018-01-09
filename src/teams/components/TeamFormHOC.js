import React from 'react';

const TeamFormHOC = (FormLayout) => class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            username: '',
        };
    }

    handleChange = field => event => {
        this.setState({[field]: event.target.value});
    };

    handleAction = () => {
        const {team, username} = this.state;
        const {action} = this.props;
        action(team, username);
    };

    render() {
        return <FormLayout {...this.state} handleChange={this.handleChange} handleAction={this.handleAction} />;
    }
};

export default TeamFormHOC;
