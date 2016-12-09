import React, { Component } from 'react';
import Chart from 'chart.js';

export default class ProfileChart extends Component {
    componentDidMount() {
        const chartOptions =  {};
        const ctx = document.getElementById("profileChart");
        const { profile } = this.props;
        console.log(profile);
        if (profile) {
            new Chart(ctx, {
                type: 'line',
                options: chartOptions,
                data: this.parseExpHistory(profile.exp_history),
            });
        }
    }

    parseExpHistory = (raw_data) => ({
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
        return (
            <canvas id="profileChart" />
        );
    }
}
