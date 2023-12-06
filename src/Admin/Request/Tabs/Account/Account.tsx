import React, { useState, useEffect } from 'react'
import { AdminService, BlockAccountReq } from '../../../../Services/AdminServices'
import { Button, Dropdown, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Account.scss'

function Account() {

    const adminServices = new AdminService()
    const [data, setData] = useState<BlockAccountReq[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        adminServices.getblockAccountreq().then((res) => {
            setData(res)
        })
    }, []);

    // const viewPost = (reqId, postId) => {
    //     navigate(`/req/${reqId}/post/${postId}`, { replace: true });
    // }
    return (
        <div>
            <div>
                <Table responsive className="list-table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.ReqDescription}</td>
                                    <td>
                                        {/* <Button onClick={() => viewPost(item._id, item.postId)}>Open </Button> */}
                                        <Button>Open </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Account
