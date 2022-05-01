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

import AdminEventHome from './AdminEventHome';
import AdminCreateStack from './AdminCreateStack';
import AdminCreateClientStack from './AdminCreateClientStack';
import AdminClientDecks from './AdminClientDecks';

class AdminEventPage extends Component {
    constructor(props) {
        super(props)
        
        // console.log("Rails properties", properties)

        this.state = {
            title: properties.data.title,
            description: properties.data.description,
            tableData: [],
            tabValue: 0
        }
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    back = () => {
        window.location.href = "/admin"
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="container">
                    <div className="user-events">
                        <h2> {this.state.title} </h2>
                        <h6> {this.state.description} </h6>
                        
                        <Button variant="outlined" style={{float: 'right', marginRight: '1%'}} onClick={this.back}>Back</Button>

                        <div>
                            <Box sx={{ width: '100%' }}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                  <Tab label="Home" />
                                  <Tab label="Event Submissions" />
                                  <Tab label="Master Deck" />
                                  <Tab label="Client Decks" />
                                  <Tab label="Finalized Candidates" />
                                  <Tab label="Summary" />
                                </Tabs>
                              </Box>
                              
                              {this.state.tabValue === 0 &&
                                  <div>
                                    <AdminEventHome properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 1 &&
                                  <div>
                                    <AdminCreateStack properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 2 &&
                                  <div>
                                    <AdminCreateClientStack properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 3 &&
                                  <div>
                                    <AdminClientDecks properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 4 &&
                                  <div>
                                    Finalized candidates
                                  </div>
                              }
                              
                              {this.state.tabValue === 5 &&
                                  <div>
                                    Summary
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

export default AdminEventPage