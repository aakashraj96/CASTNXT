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
import Slide from '../Forms/Slide';
import TextField from '@mui/material/TextField';

class ClientEventFeedback extends Component {
    constructor(props) {
        super(props)
        
        console.log(props)

        this.state = {
            eventId: props.properties.data.id,
            title: props.properties.data.title,
            description: props.properties.data.description,
            schema: props.properties.data.schema,
            uischema: props.properties.data.uischema,
            slides: props.properties.data.slides,
            entries: [],
            page:0,
            rowsPerPage: 1,
            feedback: ''
        }
    }
    
    componentDidMount() {
        let schema = this.state.schema
        let slides = this.state.slides
        let entries = []
        
        schema['title'] = this.state.title
        schema['description'] = this.state.description
        
        for(var key in slides) {
        entries.push({
          ...slides[key],
          id: key,
        }) 
      }
        
      this.setState({
          entries: entries,
          schema: schema
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
    
    handleChangeRowsPerPage = (event) => {
      this.setState({
        rowsPerPage: event.target.value
      })
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
                                          <Slide
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
                                  rowsPerPageOptions={[1]}
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