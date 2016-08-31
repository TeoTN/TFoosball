import React, { Component } from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => ({...state});
import Chart from 'chart.js';

@connect(mapStateToProps, null)
export default class ProfileChart extends Component {
    componentDidMount() {
        const chartOptions =  {};
        const ctx = document.getElementById("profileChart");
        new Chart(ctx, {
            type: 'line',
            options: chartOptions,
            data: this.props.profile.expHistory,
        });
    }

    render() {
        return (
            <canvas id="profileChart" />
        );
    }
}