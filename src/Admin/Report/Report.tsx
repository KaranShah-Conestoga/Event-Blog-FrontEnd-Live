import React, { useState, useEffect } from 'react'
import { AdminService, ReportedPostCount } from '../../Services/AdminServices';
import { Button, Dropdown, Form, Table } from 'react-bootstrap';

function Report() {
    const [reportedPost, setReportedPost] = useState<ReportedPostCount[]>([]);
    const adminServices = new AdminService()

    useEffect(() => {
        adminServices.getAllReportedPost().then((res) => {
            setReportedPost(res)
        })
    }, []);
    console.log(reportedPost, "reportedPost")
    return (
        <div>
            <Table responsive className="list-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>TotalReport</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                 {
                    reportedPost.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.email}</td>
                                <td>{item.TotalReport}</td>
                                <td>
                                    <Button>Open </Button>
                                </td>
                            </tr>
                        )
                    })
                 }
                </tbody>
            </Table>
         
            </div>
    )
}

export default Report