import React, { Component } from 'react';
import Chart from 'chart.js';
import { Panel, Col } from 'react-bootstrap';
import Loading from './Loading';

export default class ProfileChart extends Component {
    componentDidUpdate() {
        this.setUpChart();
    }

    setUpChart() {
        const chartOptions =  {};
        const ctx = this.chartDOM;
        const { profile: { exp_history } } = this.props;
        if (exp_history && ctx) {
            new Chart(ctx, {
                type: 'line',
                options: chartOptions,
                data: this.parseExpHistory(exp_history),
            });
        }
    }

    parseExpHistory = (raw_data=[]) => ({
        labels: raw_data.map(point => point.date),
        "datasets": [
            {
                "label": "Experience Points",
                "backgroundColor": "rgba(26,179,148,0.5)",
                "borderColor": "rgba(26,179,148,0.7)",
                "pointBackgroundColor": "rgba(26,179,148,1)",
                "pointBorderColor": "#fff",
                "data": raw_data.map(point => point.daily_avg),
            }
        ],
    });

    render() {
        const { profile: {exp_history}, profile } = this.props;
        return (
            <Col sm={7}>
                <Panel>
                    <h4>Exp history</h4>
                    {
                        Object.keys(profile).length === 0 ?
                            <Loading /> :
                            exp_history ?
                                <canvas id="profileChart" ref={(chart) => { this.chartDOM = chart; }} /> :
                                <p>Sorry, user has no experience points history.</p>
                    }
                </Panel>
            </Col>
        );
    }
}
