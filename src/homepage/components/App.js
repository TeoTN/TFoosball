import React from 'react';
import Header from '../../shared/components/Header';
import ModalMessage from '../../shared/components/QuestionModal';
import { ListGroupItem } from 'react-bootstrap';
import {utils} from 'react-bootstrap';

utils.bootstrapUtils.addStyle(ListGroupItem, 'lt-success');
utils.bootstrapUtils.addStyle(ListGroupItem, 'default');


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