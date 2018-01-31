import React from 'react';
import Header from '../../shared/components/Header';
import ModalMessage from '../../shared/components/ModalMessage';
import { ListGroupItem } from 'react-bootstrap';
import {utils} from 'react-bootstrap';
import { connect } from "react-redux";
import { showWhatsNew } from "../../shared/shared.actions";

utils.bootstrapUtils.addStyle(ListGroupItem, 'lt-success');
utils.bootstrapUtils.addStyle(ListGroupItem, 'default');

const mapDispatchToProps = (dispatch) => ({
    showWhatsNew: () => dispatch(showWhatsNew()),
});

class App extends React.Component {
    render() {
        const { children, showWhatsNew } = this.props;
        return (
            <div id="root-react">
                <Header />
                <ModalMessage />
                <main className="container-fluid" style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                    {children}
                </main>
                <div className="filler"/>
                <footer className="footer-app">
                    Carefully crafted by <a href="http://www.piotrstaniow.pl/">Piotr Staniów</a>.
                    [v2.4.0 - <a onClick={showWhatsNew}>Release notes</a>]
                </footer>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
