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

        this.state = {
            tableData: [],
            tabValue: 0,
            redirect: "",
        }
    }
    
    componentDidMount() {
        this.getEvents()
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    getEvents() {
        axios.get("/client/events")
            .then((res) => {
                this.setState({
                    tableData: res.data.tableData
                })
            })
            .catch((err) => {
                if (err.response.status == 403) {
                    window.location.href = err.response.data.redirect_path;
                } else {
                    console.log("Unable to contact server.")
                }
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
                        
                        <Button variant="outlined" style={{float: 'right', marginRight: '1%'}} onClick={this.back}>Back</Button>
                        
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
                                    <ClientEventSummary />
                                  </div>
                              }
                              
                              {this.state.tabValue === 1 &&
                                  <div>
                                    <ClientEventFeedback />
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