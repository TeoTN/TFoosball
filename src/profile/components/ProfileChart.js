import React, { Component } from 'react';
import Chart from 'chart.js';
import { Col } from 'react-bootstrap';
import Loading from '../../shared/components/Loading';

export default class ProfileChart extends Component {
    componentDidUpdate() {
        this.setUpChart();
    }

    setUpChart() {
        const chartOptions =  {
            scales: {
                yAxes: [{
                    position: "left",
                    "id": "y-exp"
                }, {
                    position: "right",
                    "id": "y-amount",
                    gridLines: {
                        display: false,
                    }
                }]
            }
        };
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
                "yAxisID": "y-exp",
            },
            {
                "label": "Matches played",
                "fill": false,
                "steppedLine": false,
                "borderColor": "rgba(170, 170, 170, 0.7)",
                "pointBackgroundColor": "rgba(150, 150, 150, 1)",
                "pointBorderColor": "#fff",
                "data": raw_data.map(point => point.amount),
                "yAxisID": "y-amount",
                "lineTension": 0.1,
            }
        ],
    });

    render() {
        const { profile: {exp_history}, profile } = this.props;
        return (
            <Col md={7}>
                    <h4>History</h4>
                    {
                        Object.keys(profile).length === 0 ?
                            <Loading /> :
                            exp_history ?
                                <canvas id="profileChart" ref={(chart) => { this.chartDOM = chart; }} /> :
                                <p>Sorry, user has no experience points history.</p>
                    }
            </Col>
        );
    }
}
