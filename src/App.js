import React, { Component } from 'react';
import Header from './components/Header';
import ErrorBar from './components/ErrorBar';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, props) => ({
    handleMessage: (messageEvent) => dispatch(messageEvent.data),
});

@connect(null, mapDispatchToProps)
class App extends Component {
    componentDidMount() {
        const { handleMessage } = this.props;
        window.onmessage = handleMessage;
    }

    render() {
        return (
            <div>
                <Header />
                <ErrorBar />
                <main className="container">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default App;