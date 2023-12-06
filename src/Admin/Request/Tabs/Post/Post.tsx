import React, { useState, useEffect } from 'react'
import { AdminService, BlockPostReq } from '../../../../Services/AdminServices'
import { Button, Dropdown, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Post.scss'

function Post() {
  const adminServices = new AdminService()
  const [data, setData] = useState<BlockPostReq[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    adminServices.getblockpostreq().then((res) => {
      setData(res)
    })
  }, []);
  console.table(data)

  const viewPost = (reqId, postId) => {
    navigate(`/req/${reqId}/post/${postId}`, { replace: true });
  }
  console.log(data, "data")

  return (
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
                  <Button onClick={() => viewPost(item._id, item.postId)}>Open </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Post
