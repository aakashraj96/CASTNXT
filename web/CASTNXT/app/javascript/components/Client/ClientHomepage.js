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

class ClientHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableData: properties.tableData
        }
    }
    
    renderEventList() {
        const { tableData } = this.state
        let rows = []
        if (!tableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell align="center">
                        No ongoing Events right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            tableData.map((event, i) => {
                rows.push(
                    <TableRow key={i}>
                        <TableCell>
                            <b><Link to={{
                                pathname: "/client/events/" + event.eventId
                            }}>{event.event}</Link></b>
                        </TableCell>
                    </TableRow>
                )
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
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#3498DB' }}>
                                            <TableRow>
                                                <TableCell align="center">Event</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.renderEventList()}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientHomepage