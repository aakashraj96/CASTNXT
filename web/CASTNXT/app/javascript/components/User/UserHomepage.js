import React, {Component} from 'react'
import Header from '../Navbar/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

class UserHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            acceptingTableData: properties.acceptingTableData,
            submittedTableData: properties.submittedTableData,
            tabValue: 0
        }
    }
    
    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        })
    }
    
    renderAcceptingEventList() {
        const { acceptingTableData } = this.state
        
        let rows = []
        if (!acceptingTableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell align="center">
                        No ongoing Events right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            acceptingTableData.map((event, i) => {
                rows.push(
                    <TableRow key={i}>
                        <TableCell>
                            <b><Link to={{
                                pathname: "/user/events/" + event.eventId
                            }}>{event.event}</Link></b>
                        </TableCell>
                    </TableRow>
                )
            });
        } 
        return rows;
    }
    
    renderSubmittedEventList(type) {
        const { submittedTableData } = this.state
        
        let rows = []
        if (!submittedTableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell colSpan={2} align="center">
                        No Events submitted to right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            submittedTableData.map((event, i) => {
                if (event.accepting) {
                    rows.push(
                        <TableRow key={i}>
                            <TableCell>
                                <b><Link to={{
                                    pathname: "/user/events/" + event.eventId
                                }}>{event.event}</Link></b>
                            </TableCell>
                            <TableCell>
                                {event.status}
                            </TableCell>
                        </TableRow>
                    )
                } else {
                    rows.push(
                        <TableRow key={i}>
                            <TableCell>
                                <b>{event.event}</b>
                            </TableCell>
                            <TableCell>
                                {event.status}
                            </TableCell>
                        </TableRow>
                    )
                }
            });
        } 
        return rows;
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div>
                    <div className="container user-events">
                        <div className="row">
                            <h1> FashioNXT Events </h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div>
                                    <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                        <Tab style={{focus: "color: #719ECE"}} label="Events" />
                                        <Tab label="Submissions" />
                                    </Tabs>
                                    <hr style={{ color: 'black' }} />
                                </div>
                            
                                {this.state.tabValue === 0 &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead style={{ backgroundColor: '#3498DB' }}>
                                                <TableRow>
                                                    <TableCell align="center">Event</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.renderAcceptingEventList()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                                
                                {this.state.tabValue === 1 &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead style={{ backgroundColor: '#3498DB' }}>
                                                <TableRow>
                                                    <TableCell align="center">Event</TableCell>
                                                    <TableCell align="center">Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.renderSubmittedEventList()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomepage