import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import HighestReport from './Tabs/HighestReport';
import InactiveUsers from './Tabs/InactiveUsers';
import Grid from '@mui/material/Grid';
import AllUser from './Tabs/AllUser';


function UserList() {
    
    return (
        <div>
            <Tabs
                defaultActiveKey="allUser"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="allUser" title="All User">
                    <AllUser />
                </Tab>
                <Tab eventKey="inactiveUser" title="Inactive User">
                    <InactiveUsers />
                </Tab>
                <Tab eventKey="highestPostReport" title="Highest Post Report">
                    <HighestReport />
                </Tab>

            </Tabs>
        </div>
    )
}

export default UserList
