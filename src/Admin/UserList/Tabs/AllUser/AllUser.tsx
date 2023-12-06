import React from 'react'
import { useState, useEffect } from "react";
import { SearchParam } from '../../../../Services/PostServices';
import { Button, Dropdown, Form, Table } from 'react-bootstrap';
import { AdminService, User } from '../../../../Services/AdminServices';
import moment from 'moment';
import './AllUser.scss';


function AllUser() {
    const [search, setSearch] = useState('');
    const [allUser, setAllUser] = useState<User[]>([]);
    const adminServices = new AdminService();
    useEffect(() => {
        getallUser()
    }, []);

    const getallUser = async () => {
        const param: SearchParam = {
            Searchby: search
        }
        await adminServices.getAllUser(param).then((data) => {
            setAllUser(data);
        }).catch((e) => {
            console.log('e', e)
        });
    };

    return (
        <>
            <div className='dash-container new-height'>
                <div className="post-search">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        name="search" placeholder="Search.."
                    />
                    <Button className='search-button' onClick={() => getallUser()}>
                        Search
                    </Button>
                </div>

            </div>

            <Table responsive className="list-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Created     At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                {(item.status) ? <td>Active</td> : <td>Blocked</td>}
                                <td>
                                    {moment(item.created).format('DD/MM/YYYY')
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </>


    )
}

export default AllUser
