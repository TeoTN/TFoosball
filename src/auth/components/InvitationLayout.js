import React from 'react';
import { Row, Col, Grid, Panel } from "react-bootstrap";


export class InvitationLayout extends React.PureComponent {
    render() {
        const {children} = this.props;
        return (
            <Grid>
                <Panel>
                    <Row>
                        <Col xs={8} xsOffset={2} style={{textAlign: 'center'}}>
                            {children}
                        </Col>
                    </Row>
                </Panel>
            </Grid>
        );
    }
}

export default InvitationLayout;
