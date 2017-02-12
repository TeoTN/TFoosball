import React from 'react';
import Header from '../../shared/components/Header';
import InfoBar from '../../shared/components/InfoBar';
import ErrorBar from '../../shared/components/ErrorBar';
import QuestionModal from '../../shared/components/QuestionModal';

export default class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <InfoBar />
                <ErrorBar />
                <QuestionModal />
                <main className="container-fluid">
                    {children}
                </main>
            </div>
        );
    }

}