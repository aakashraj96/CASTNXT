import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../Navbar/Header';
import FormBuilderContainer from '../Forms/FormBuilder.js'
import Form from '@rjsf/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Button from '@mui/material/Button';
import { MultiSelect } from "react-multi-select-component";
// import {curatedData, formSchema} from './data';

class AdminCreateClientStack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: "",
            schema: [],//formSchema.schema,
            uischema: [],//formSchema.uischema,
            formData: [],//formSchema.formData,
            entries: [],//curatedData.entries,
            curatedStack: [],
            showStack: false,
            clients: [],
            page:0,
            rowsPerPage: 1,
            clientOptions: [],//[{label: 'client 1', value: 'client1'}, {label: 'client 2', value: 'client2'}],
            clientSelections: [],
        }
    }
    
    componentDidMount() {
        let entries = this.state.entries

        entries = entries.filter(row => row['curated'] === true)
        
        this.setState({
            entries: entries,
        })
        
    }
    
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
    back = () => {
        this.setState({
            redirect: 'admin'
        })
    }
    
    updateClients = () => {
      this.setState({
        entries: this.state.entries
      })
    }
    
    handleClientChange = (clients, row) => {
      
      let i, entries = this.state.entries
      
      for(i=0; i<entries.length; i++) {
        if(entries[i].id === row['id']) {
          entries[i]['clients'] = clients
        }
      }
      
      this.setState({
        entries: entries,
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
    
    handleSelect(selectedItems) {
      this.setState({ selectedItems: selectedItems });
    }

    render() {
        
        if(this.state.redirect === "admin") {
            return <Redirect to='/admin'/>;
        }
        
        return(
            <div>
                
                <div style={{marginTop: '1%'}}>
                
                    <p>Use this page to create client-specific slide decks</p>

                    <div>

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
                                              />
                                              
                                              <br />
                                              
                                              Clients:
                                              <MultiSelect
                                                options={this.state.clientOptions}
                                                value={row['clients']}
                                                onChange={(option) => this.handleClientChange(option, row)}
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

                        <Button variant="contained" onClick={this.updateClients}>Update</Button><br />
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCreateClientStack