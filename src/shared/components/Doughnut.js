import React from 'react';
import Chart from 'chart.js';

export default class Doughnut extends React.Component {
    componentDidUpdate() {
        this.setUpChart();
    }

    getColor(name) {
        switch (name) {
            case 'success': return '#18bc9c';
            case 'danger': return '#e74c3c';
            case 'info': return '#3498db';
            case 'warning': return '#f39c12';
            case 'primary': return '#2c3e50';
            default: return '#2c3e50';
        }
    }

    getActiveColor(name) {
        switch (name) {
            case 'success': return '#128f76';
            case 'danger': return '#d62c1a';
            case 'info': return '#217dbb';
            case 'warning': return '#c87f0a';
            case 'primary': return '#1a242f';
            default: return '#1a242f';
        }
    }

    setUpChart() {
        const chartOptions =  {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
            cutoutPercentage: 60,
        };
        const ctx = this.chartDOM;
        const { value, bsStyle } = this.props;
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                options: chartOptions,
                data: {
                    datasets: [
                        {
                            data: [value, 100-value],
                            backgroundColor: [
                                this.getColor(bsStyle),
                                this.getActiveColor(bsStyle),
                            ],
                            hoverBackgroundColor: [
                                this.getColor(bsStyle),
                                this.getActiveColor(bsStyle),
                            ],
                            borderWidth: 0,
                        }
                    ]
                },
            });
        }
    }

    render() {
        const { label } = this.props;
        return (
            <div>
                <canvas id="profileChart" ref={(chart) => { this.chartDOM = chart; }} />
                { label ? <h6 className="text-center">{label}</h6> : null }
            </div>
        );
    }
}
