import React from 'react';
import Chart from 'chart.js';

export default class Doughnut extends React.Component {
    componentDidUpdate() {
        this.setUpChart();
    }

    getLightColor(name) {
        switch (name) {
            case 'success': return '#69D3BF';
            case 'danger': return '#EF8B80';
            case 'info': return '#7BBCE8';
            case 'warning': return '#F7BF65';
            case 'primary': return '#76828D';
            default: return '#76828D';
        }
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
            case 'success': return '#098c73';
            case 'danger': return '#d32017';
            case 'info': return '#187aa9';
            case 'warning': return '#c87f0a';
            case 'primary': return '#1a242f';
            default: return '#1a242f';
        }
    }

    setUpChart() {
        const { value, bsStyle } = this.props;
        const chartOptions =  {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
            cutoutPercentage: 70,
            rotation: Math.PI*1.5 - Math.PI*value/100,
        };

        const ctx = this.chartDOM;
        if (!ctx) return;
        new Chart(ctx, {
            type: 'doughnut',
            options: chartOptions,
            data: {
                datasets: [
                    {
                        data: [value, 100-value],
                        backgroundColor: [
                            this.getColor(bsStyle),
                            "#e1e5e5",
                        ],
                        borderWidth: 0,
                    }
                ]
            },
        });
    }

    render() {
        const { label, bsStyle } = this.props;
        return (
            <div>
                <canvas id="profileChart" ref={(chart) => { this.chartDOM = chart; }} />
                { label ? <h6 className={`text-center text-${bsStyle}`}>{label}</h6> : null }
            </div>
        );
    }
}
