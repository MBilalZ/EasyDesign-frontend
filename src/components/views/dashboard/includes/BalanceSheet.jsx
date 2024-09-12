import React, {useState} from 'react';
import Div from "@/components/base/Div.jsx";
import Chart from 'react-apexcharts';
import {Typography} from "@mui/material";

const BalanceSheet = (props) => {
    const [chartData] = useState({
        series: [
            {
                name: 'Revenue',
                data: [50, 76, 85, 101, 98, 87]
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 300
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    // columnWidth: '40%',
                    endingShape: 'rounded',
                    distributed: true,  // Enable distributed property
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                // title: {
                //     text: '$'
                // },
            },
            yaxis: {},
            fill: {
                opacity: 1,
            },
            colors: ['#3261D8', '#29AB51'],  // Define alternating colors
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val;
                    }
                }
            },
        }
    });
    return (
        <Div {...props}>
            <Typography
                variant={'body2'}
                fontSize={16}
                fontWeight={600}
                color={'#383838'}
                marginBottom={0}>
                Balance analytics
            </Typography>
            <Chart options={chartData.options} series={chartData.series} type="bar" height={250}/>
        </Div>
    );
};

export default BalanceSheet;
