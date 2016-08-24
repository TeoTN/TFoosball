import React, { Component } from 'react';
import Header from './components/Header';
import ErrorBar from './components/ErrorBar';

class App extends Component {
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