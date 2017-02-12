import React from 'react';
import Header from '../../shared/components/Header';
import QuestionModal from '../../shared/components/QuestionModal';

export default class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <QuestionModal />
                <main className="container-fluid">
                    {children}
                </main>
            </div>
        );
    }

}