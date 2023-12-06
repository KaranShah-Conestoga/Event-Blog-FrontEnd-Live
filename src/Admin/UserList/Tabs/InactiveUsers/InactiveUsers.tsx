import React, { useState, useEffect } from 'react'
import { AdminService, HPRU, InactiveUser } from '../../../../Services/AdminServices'
import { Button, Dropdown, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './InactiveUsers.scss'


function InactiveUsers() {
    const adminServices = new AdminService()
    const [data, setData] = useState<InactiveUser[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        adminServices.getInactiveUser().then((res) => {
            setData(res)
        })
    }, []);



    return (
        <div>
            <Table responsive className="list-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                {(item.status) ? <td>Active</td> : <td>Blocked</td>}
                                {/* <td>
                                    <Button >Open </Button>
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default InactiveUsers
