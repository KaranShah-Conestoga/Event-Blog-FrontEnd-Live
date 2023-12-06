import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { AdminService, Count, DecadeData, PostUserCount, SearchParam, TopUser, ViewLikeCount } from "../../Services/AdminServices";
import Chart from "react-apexcharts";
import './DashBoard.scss'

function DashBoard() {

    const year: any = (new Date()).getFullYear();
    const [data, setData] = useState<Count>();
    const adminServices = new AdminService();
    const [yearData, setYearData] = useState(year);
    const [total, setTotal] = useState<{ post: number, user: number, report: number }>({ post: 0, user: 0, report: 0 });
    const [userPostCount, setUserPostCount] = useState<PostUserCount>()
    const [viewLikeCount, setViewLikeCount] = useState<ViewLikeCount>()
    const [tenYearData, setTenYearData] = useState<DecadeData>()
    const [topUser, setTopUser] = useState<TopUser[]>([])
    const options: any = [];

    for (let i = 0; i <= 10; i++) {
        const years = year - i;
        options.push(<option value={years}>{years}</option>);
    }

    const param: SearchParam = {
        year: yearData
    }
    useEffect(() => {
        adminServices.getPostUserReportCount(param).then((res) => {
            setTotal({ post: 0, user: 0, report: 0 })
            setData(res);
            userTotal(res)
        });
    }, [yearData]);

    useEffect(() => {
        adminServices.getpostcount().then((res) => {
            setUserPostCount(res);
        })
        adminServices.getviewlikecount().then((res) => {
            setViewLikeCount(res);
        })
        adminServices.getdecadeData().then((res) => {
            setTenYearData(res);
            getTopUser(res.count)
        })
    }, []);

    const getTopUser = (data) => {
        const newData = data.filter(n => n > 100);
        const monthArry: number[] = [];
        newData.map((item) => {
            const x = data.indexOf(item) + 1;
            monthArry.push(x);
        })
        const param: any = {
            "monthArry": monthArry
        }
        adminServices.getTopUserInDecade(param).then((data) => {
            setTopUser(data);
        })
    }

    const userTotal = (value: Count) => {
        if (value.user.length && value.reportData.length && value.post.length) {
            for (let i = 0; i < 12; i++) {
                setTotal((prevValues) => {
                    return prevValues = { post: prevValues.post + value.post[i], user: prevValues.user + value.user[i], report: prevValues.report + value.reportData[i] }
                })
            }
        }
    };

    const state: any = {
        series: [
            {
                name: "Users",
                data: data?.user
            },
            {
                name: "Posts",
                data: data?.post
            },
            {
                name: "Reports",
                data: data?.reportData
            }
        ],
        options: {
            chart: {
                height: 350,
                type: "area",
                foreColor: '#fff'
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "month",
                categories: [`Jan ${yearData}`, `Feb ${yearData}`, `March ${yearData}`, `April ${yearData}`, `May ${yearData}`, `June ${yearData}`, `July ${yearData}`, `Aug ${yearData}`, `Sep ${yearData}`, `Oct ${yearData}`, `Nov ${yearData}`, `Dec ${yearData}`]
            },

        }
    };

    const barstate: any = {
        options: {
            chart: {
                id: "basic-bar",
                foreColor: '#fff'
            },
            xaxis: {
                categories: userPostCount?.user
            }
        },
        series: [
            {
                name: "Post Count",
                data: userPostCount?.count
            }
        ]
    };

    const decadeData: any = {
        options: {
            chart: {
                id: "basic-bar",
                foreColor: '#fff'
            },
            xaxis: {
                categories: tenYearData?.months
            }
        },
        series: [
            {
                name: "OverAll",
                data: tenYearData?.count
            }
        ]
    };

    const apexOpts: any = {

        chart: {
            height: 450,
            type: "bar",
            foreColor: '#fff'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: "12px",
                colors: ["#fff"]
            }
        },


        colors: ["#5D79FF", "#eee"],
        xaxis: {
            categories: viewLikeCount?.user,
            labels: {
                show: true
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        grid: {
            row: {
                colors: undefined,
                opacity: 0.2
            },
            column: {
                colors: undefined,
                opacity: 0.2
            }
        },
        fill: {
            opacity: 1
        },
    };

    const apexData: any = [
        {
            name: "Likes",
            data: viewLikeCount?.likeCount
        },
        {
            name: "Views",
            data: viewLikeCount?.viewCount
        }
    ];

    const handleyear = (e: any) => {
        setYearData(e.target.value)
    }

    return (
        <div className="admin-dashboard">
            <div className="chart-div">
                <form >
                    <label >Choose a year:</label>
                    <select onChange={handleyear}>
                        {options}
                    </select>
                    <br></br>

                </form>
                <div className="count-div">
                    <div className="user-count">
                        <h3>Total Users</h3>
                        <h1>{total.user}</h1>
                    </div>
                    <div className="post-count">
                        <h3>Total Posts</h3>
                        <h1>{total.post}</h1>
                    </div>
                    <div className="report-count">
                        <h3>Total Reports</h3>
                        <h1>{total.report}</h1>
                    </div>
                </div>

                <div id="chart" >
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="bargraphs">
                        {/* <h1 style={{ color: "white", paddingTop: "35px" }}>User and their Post Count</h1> */}
                        <div className="left-chart">
                            <Chart
                                options={barstate.options}
                                series={barstate.series}
                                type="bar"
                                width="500"
                            />
                        </div>
                        <div className="right-chart">
                            <ReactApexChart
                                options={apexOpts}
                                series={apexData}
                                type="bar"
                                height={350}
                            />
                        </div>
                    </div>

                    <h1 style={{ color: "white", paddingTop: "35px" }}>10 Year Data</h1>
                    <div className="ten-year">
                        <div className="tenYear-bar">
                            <Chart
                                options={decadeData.options}
                                series={decadeData.series}
                                type="bar"
                                width="500"
                            />
                        </div>
                        <div className="top-User">
                            {/* <h1 style={{ color: "white", paddingTop: "35px" }}>Top 10 Users</h1> */}
                            {topUser.map((value, i) => {

                                return (
                                    <li key={i}>
                                        <div className="top-user-div">
                                            <div className="userId">
                                                <h3>{value.userId}</h3>
                                            </div>
                                            <div className="top-user-count">
                                                <h3>{value.count}</h3>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
