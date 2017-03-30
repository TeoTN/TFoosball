import React from 'react';
import Header from '../../shared/components/Header';
import ModalMessage from '../../shared/components/QuestionModal';

export default class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <ModalMessage />
                <main className="container-fluid">
                    {children}
                </main>
            </div>
        );
    }

}