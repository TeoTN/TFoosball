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
            <div id="root-react">
                <Header />
                <ModalMessage />
                <main className="container-fluid" style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                    {children}
                </main>
                <div className="filler"/>
                <footer className="footer-app">
                    Carefully crafted by <a href="http://www.piotrstaniow.pl/">Piotr Staniów</a>. [v2.2.1]
                </footer>
            </div>
        );
    }

}