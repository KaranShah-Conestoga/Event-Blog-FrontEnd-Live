import React, { useState, useEffect } from 'react'
import { AdminService, HPRU } from '../../../../Services/AdminServices'
import { Button, Dropdown, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HighestReport.scss'


function HighestReport() {
  const adminServices = new AdminService()
  const [data, setData] = useState<HPRU[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    adminServices.getHPRU().then((res) => {
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
            <th>Total Posts Report</th>
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
                <td>{item.count}</td>
                <td>
                  <Button onClick={() =>
                    navigate(`/user/${item.userId}`, { replace: true })
                  }>Open </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default HighestReport
