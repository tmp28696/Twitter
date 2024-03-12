import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PieChart from "highcharts-react-official";
import { Redirect } from 'react-router';

class analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetview10: [],
            tweetview10Xaxis: [],
            tweetlike10: '',
            tweetretweet5: '',
            retweet5legends: '',
            tweethourcount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            tweetmonthlycount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            tweetdailycount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            profileviewcount: 0,
        }
    }
    async componentDidMount() {
        let viewtweetCounts = [];
        let tweetXaxis = [];
        let tweetliketop10 = [];
        let retweettop10 = [];
        let hourcount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let monthlycount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let dailycount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        try {
            const responses = await Promise.all([
                fetch(`/analytics/viewcount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/likecount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/retweetcount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/hourcount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/daycount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/monthcount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                }),
                fetch(`/analytics/profileviewcount`, {
                    method: 'get',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            ]);
            const [res1, res2, res3, res4, res5, res6, res7] = await Promise.all(responses.map(r => r.json()));

            res1.forEach(obj => {
                viewtweetCounts.push(obj.tweet.viewCount);
                tweetXaxis.push(obj.tweet.tweetID);
            });

            res2.forEach(obj => {
                tweetliketop10.push({
                    y: obj.count,
                    selected: true,
                    name: obj._id,
                });
            });

            res3.forEach(obj => {
                retweettop10.push({
                    y: obj.count,
                    selected: true,
                    name: obj._id,
                });
            });

            res4.forEach(cnt => {
                hourcount[cnt._id.h] = cnt.count;
            });

            res5.forEach(cnt => {
                dailycount[cnt._id.d] = cnt.count;
            });

            res6.forEach(cnt => {
                monthlycount[Number(cnt._id.m) - 1] = cnt.count
            });
            let cnt = 0;
            if (res7.length > 0) {
                cnt = res7[0].count;
            } else {
                cnt = 0;
            }
            this.setState({
                tweetview10: viewtweetCounts,
                tweetview10Xaxis: tweetXaxis,
                tweetlike10: tweetliketop10,
                tweetretweet5: retweettop10,
                tweethourcount: hourcount,
                tweetdailycount: dailycount,
                tweetmonthlycount: monthlycount,
                profileviewcount: cnt,
            });
        }
        catch (e) {
            this.setState({ msg: e.message || e });
        }
    }
    render() {
        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            redirectVar = <Redirect to="/login" />
        }
        const tweetview10 = {
            chart: {
                zoomType: 'x',
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                text: 'Top 10 viewed tweets',
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                title: {
                    text: 'Tweets',
                    style: {
                        color: '#A0A0A3'
                    }
                },
                type: 'text',
                categories: this.state.tweetview10Xaxis,
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'View Count',
                    style: {
                        color: '#A0A0A3'
                    }
                },
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
            },
            legend: {
                enabled: false,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'column',
                name: 'Viewed Tweet Count',
                data: this.state.tweetview10
            }]
        };
        const top10like = {
            chart: {
                type: "pie"
            },
            title: {
                text: 'Top 10 liked tweets',
            },
            series: [{
                name: 'Liked Tweets Count',
                colorByPoint: true,
                data: this.state.tweetlike10
            }]
        };
        const top5retweet = {
            chart: {
                type: "pie"
            },
            title: {
                text: 'Top 5 retweets',
            },
            series: [{
                name: 'Retweets Count',
                colorByPoint: true,
                data: this.state.tweetretweet5
            }]
        };
        var hourly = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tweets Statistics'
            },
            subtitle: {
                text: 'Hourly Tweet Count'
            },
            xAxis: {
                categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Tweet Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Hourly',
                    data: this.state.tweethourcount
                },
                // {
                //     name: 'Daily',
                //     data: this.state.tweetdailycount
                // },
                // {
                //     name: 'Monthly',
                //     data: this.state.tweetmonthlycount
                // }
            ]
        };
        var daily = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tweets Statistics'
            },
            subtitle: {
                text: 'Daily Tweet Count'
            },
            xAxis: {
                // categories: [
                //     'Jan'
                // ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Tweet Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [

                {
                    name: 'Daily',
                    data: this.state.tweetdailycount
                },
                // {
                //     name: 'Monthly',
                //     data: this.state.tweetmonthlycount
                // }
            ]
        };
        var monthly = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tweets Statistics'
            },
            subtitle: {
                text: 'Monthly Tweet Counts'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Tweet Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Monthly',
                    data: this.state.tweetmonthlycount
                }
            ]
        };
        return (
            <div className="container-flex">
                <div className="col-md-12 feed">
                    <div style={{ width: "60%", margin: "0 auto", textAlign: "center" }}>
                        <h3>My Profile View Count         <span class="badge badge-primary">  {this.state.profileviewcount}</span></h3>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={tweetview10} />
                    <div class="col-md-6 feed">
                        <PieChart highcharts={Highcharts} options={top5retweet} />
                    </div>
                    <div className="col-md-6 feed">
                        <PieChart highcharts={Highcharts} options={top10like} />
                    </div>
                    <div className="col-md-12 feed">
                        <div className="col-md-4 feed">
                            <HighchartsReact highcharts={Highcharts} options={hourly} />
                        </div>
                        <div className="col-md-4 feed">
                            <HighchartsReact highcharts={Highcharts} options={daily} />
                        </div>
                        <div className="col-md-4 feed">
                            <HighchartsReact highcharts={Highcharts} options={monthly} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default analytics;