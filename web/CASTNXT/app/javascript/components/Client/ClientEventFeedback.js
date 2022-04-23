import React, {Component} from 'react'
import Header from '../Navbar/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import axios from 'axios';
import FormBuilderContainer from '../Forms/FormBuilder.js'
import Form from '@rjsf/core';
import TextField from '@mui/material/TextField';
// import {curatedData, formSchema} from '../Admin/data';

class ClientEventFeedback extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableData: [],
            tabValue: 0,
            redirect: "",
            schema: [],//formSchema.schema,
            uischema: [],//formSchema.uischema,
            formData: [],//formSchema.formData,
            entries: [],//curatedData.entries,
            curatedStack: [],
            showStack: false,
            client: '',
            page:0,
            rowsPerPage: 1,
            feedback: ''
        }
    }
    
    componentDidMount() {
        this.getEvents()
        
        let entries = this.state.entries
        
        entries = entries.filter(row => row['curated'] === true)
        
        this.setState({
            entries: entries
        })
    }
    
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    };
    
    handleChangeRowsPerPage = (event, num) => {
      console.log(event.target.value)
      this.setState({
        rowsPerPage: event.target.value
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
    
    renderEventList() {
        const { tableData } = this.state
        
        tableData.push({
            eventId: 1,
            event: 'Fashion Show',
            status: 'Registration Open'
        })
        
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
                        <TableCell align="center" onClick={() => {window.location.href="/client/event/"+event.eventId}}>
                            <b><a href={"/client/event/"+event.eventId}>{event.event}</a></b>
                        </TableCell>
                    </TableRow>
                )
            });
        } 
        return rows;
    }
    
    handleFeedbackChange = (event, row) => {
      this.setState({
        feedback: event.target.value,
        entries: this.state.entries
      })
    }

    render() {
        return(
            <div>
                <div style={{marginTop: '1%'}}>

                    <div className="col-md-8 offset-md-2">
                      <Paper>
                        <TableContainer>
                          <Table size="medium">
                            <TableBody>
                              {this.state.entries
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                      return(
                                        <TableRow
                                          key={row.id}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                          <TableCell>
                                            <Form
                                              schema={this.state.schema}
                                              uiSchema={this.state.uischema}
                                              formData={row.formData}
                                              children={true}
                                              disabled
                                            />
                                            
                                            <br />
                                            
                                             <TextField
                                                value={this.state.feedback}
                                                onChange={() => this.handleFeedbackChange(event, row)}
                                                placeholder="Enter your feedback here"
                                                name="feedback"
                                                fullWidth
                                                label="Feedback"
                                                multiline
                                                rows={4}
                                            />
                                            
                                          </TableCell>
                                          
                                        </TableRow>
                                      )
                                  })
                              }
                            </TableBody>
                            
                            <TableFooter>
                              <TableRow>
                                <TablePagination
                                  rowsPerPageOptions={[1, 2]}
                                  count={this.state.entries.length}
                                  rowsPerPage={this.state.rowsPerPage}
                                  page={this.state.page}
                                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                                  onPageChange={this.handleChangePage}
                                />
                              </TableRow>
                            </TableFooter>
                            
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                    
                    <br />

                    <Button variant="contained" onClick={this.submitFeedback}>Submit</Button>
                    
                </div>
                
            </div>
        )
    }
}

export default ClientEventFeedback