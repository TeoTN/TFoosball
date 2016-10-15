import React from 'react';
import Header from './components/Header';
import ErrorBar from './components/ErrorBar';

export default (props) => (
    <div>
        <Header />
        <ErrorBar />
        <main className="container">
            {props.children}
        </main>
    </div>
);
