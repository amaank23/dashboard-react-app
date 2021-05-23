import React, { Component } from 'react';
import TextWidget from './textwidget';
import ColumnChartWidget from './column_chart_widget';
import BarChartWidget from './bar_chart_widget';
import DoughnutChartWidget from './doughnut_chart_widget';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container} from 'react-bootstrap';



const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
export class Dashboard extends Component {
    
    constructor(){
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            socialSource: null,
            pageViews: null,
            users: null,
            numberOfSessionsPerUsers: null,
            sessions: null,
            pagePerSessions: null,
            bounceRate: null,
            newUsers: null,
            doughnutChartData: [],
            barChartData: [],
            columnChartData: []
        }
    }
    getData = (selectedOption) => {
        console.log(this.state.items);
        let organicSource;
        let directSource;
        let referralSource;
        let socialSource;
        let pageViews;
        let newUsers;
        let users;
        let numberOfSessionsPerUsers;
        let sessions;
        let pagePerSessions;
        let bounceRate;
        let doughnutChartData;
        let barChartData;
        let columnChartData;
        this.state.items.map(item => {
            if(item.month === selectedOption){
                organicSource = item.organic_source;
                directSource = item.direct_source;
                referralSource = item.referral_source;
                socialSource = item.social_source;
                pageViews = item.page_views;
                newUsers = item.new_users;
                users = item.users;
                numberOfSessionsPerUsers = item.number_of_sessions_per_users;
                sessions = item.sessions;
                pagePerSessions = item.page_per_session;
                bounceRate = item.bounce_rate;
                doughnutChartData = [
                    {
                      label: "Users",
                      value: item.users
                    },
                    {
                      label: "New Users",
                      value: item.new_users
                    }
                  ];
                  barChartData = [
                    {
                      label: "Organic Source",
                      value: item.organic_source
                    },
                    {
                      label: "Direct Source",
                      value: item.direct_source
                    },
                    {
                        label: "Referral Source",
                        value: item.referral_source
                      },
                      {
                        label: "Social Source",
                        value: item.social_source
                      }
                  ];

                  columnChartData = [
                    
                    {
                      label: "Sessions Per Page",
                      value: item.page_per_session
                    },
                    {
                        label: "Sessions Per Users",
                        value: item.number_of_sessions_per_users
                      },
                      {
                        label: "Bounce Rate",
                        value: item.bounce_rate
                      }
                  ];
            }
        })
        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            socialSource: socialSource,
            pageViews: pageViews,
            newUsers: newUsers,
            users: users,
            numberOfSessionsPerUsers: numberOfSessionsPerUsers,
            pagePerSessions: pagePerSessions,
            sessions: sessions,
            bounceRate: bounceRate,
            doughnutChartData: doughnutChartData,
            barChartData: barChartData,
            columnChartData: columnChartData
        })
    }
    updateDashboard = (event) => {
        this.getData(event.value);
        this.setState({
            selectedValue: event.value
        })
    }
    componentDidMount(){
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
        
                        let batchRowValues = data.valueRanges[0].values;
        
                        const rows = [];
        
                        for (let i = 1; i < batchRowValues.length; i++) {
                            let rowObject = {};
                            for (let j = 0; j < batchRowValues[i].length; j++) {
                                rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                            }
                            rows.push(rowObject);
                        }
                                
                        // dropdown options
                        let dropdownOptions = [];

                        for (let i = 0; i < rows.length; i++) {
                            dropdownOptions.push(rows[i].month);
                        }

                        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                        this.setState(
                            {
                                items: rows,
                                dropdownOptions: dropdownOptions,
                                selectedValue: "Jan 2018"
                            },
                            () => this.getData("Jan 2018")
                        );
                    });
    }
    render() {
        ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
       
          
        return (
            <div>
                <Container>
                    <Row className="TopBar">
                        <Col><h1>Dashboard</h1></Col>
                        <Col>
                            <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col><TextWidget heading="Organic Source" value={this.state.organicSource} /></Col>
                        <Col><TextWidget heading="Referral Source" value={this.state.referralSource} /></Col>
                        <Col><TextWidget heading="Social Source" value={this.state.socialSource} /></Col>
                        <Col><TextWidget heading="Direct Source" value={this.state.directSource} /></Col>
                        
                    </Row>
                    <Row>
                        
                        <Col md="6">
                            <Row>
                                <Col md="6"><TextWidget heading="Users" value={this.state.users} /></Col>
                                <Col md="6"><TextWidget heading="New Users" value={this.state.newUsers} /></Col>
                            </Row>
                            <Row>
                                <Col><BarChartWidget data={this.state.barChartData} /></Col>
                            </Row>
                        </Col>
                        <Col md="6"><DoughnutChartWidget data={this.state.doughnutChartData} /></Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="6"><TextWidget heading="Sessions" value={this.state.sessions} /></Col>
                                <Col md="6"><TextWidget heading="Sessions Per Page" value={this.state.pagePerSessions} /></Col>
                            </Row>
                            <Row>
                                <Col md="6"><TextWidget heading="Sessions Per Users" value={this.state.numberOfSessionsPerUsers} /></Col>
                                <Col md="6"><TextWidget heading="Bounce Rate" value={this.state.bounceRate} /></Col>
                            </Row>
                        </Col>
                        <Col md="6"><ColumnChartWidget data={this.state.columnChartData} /></Col>
                    </Row>
                    
                </Container>
               
                
                {/* <ColumnChartWidget data={chartData} />
                <BarChartWidget data={chartData} />
                <DoughnutChartWidget data={chartData} /> */}
            </div>
        )
    }
}

export default Dashboard
