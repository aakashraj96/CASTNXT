import React, {Component} from 'react'
import Header from '../Navbar/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ClientEventFeedback from './ClientEventFeedback';
import ClientEventSummary from './ClientEventSummary';

class ClientEventPage extends Component {
    constructor(props) {
        super(props)
        
        console.log("Props", props)
        console.log("properties", properties)

        this.state = {
            properties: properties,
            tableData: [],
            tabValue: 0,
            redirect: "",
        }
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    back = () => {
        window.location.href = "/client"
    }
    
    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="container">
                    <div className="user-events">
                        <h2> Event Title </h2>
                        
                        <Button variant="outlined" style={{float: 'right', marginRight: '1%'}} onClick={this.back}>Back to Homepage</Button>
                        
                        <div>
                            <Box sx={{ width: '100%' }}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                  <Tab label="Summary" />
                                  <Tab label="Event Feedback" />
                                </Tabs>
                              </Box>
                              
                              {this.state.tabValue === 0 &&
                                  <div>
                                    <ClientEventSummary properties={this.state.properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 1 &&
                                  <div>
                                    <ClientEventFeedback properties={this.state.properties} />
                                  </div>
                              }
                             
                            </Box>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientEventPage