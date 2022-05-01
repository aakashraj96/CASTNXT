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
import Alert from '@mui/material/Alert';
import Slide from '../Forms/Slide';
import axios from 'axios';

class AdminCreateClientStack extends Component {
    constructor(props) {
        super(props)
        
        console.log("Rails properties", props.properties)

        this.state = {
            properties: props.properties,
            redirect: "",
            title: props.properties.data.title,
            description: props.properties.data.description,
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uischema !== undefined ? props.properties.data.uischema : [],
            formData: [],
            entries: [],
            curatedStack: [],
            showStack: false,
            clients: [],
            page:0,
            rowsPerPage: 1,
            clientOptions: [],
            clientSelections: [],
            stackCreateSuccess: "",
            responseMessage: ""
        }
    }
    
    componentDidMount() {
        let entries = []
        let slides = this.props.properties.data.slides
        let schema = this.state.schema
        let clientOptions = []
        let clients = this.props.properties.data.clients
  
        schema['title'] = this.props.properties.data.title
        schema['description'] = this.props.properties.data.description
      
        for(var key in slides) {
          entries.push({
            ...slides[key],
            id: key,
            clients: []
          }) 
        }

        entries = entries.filter(row => row['curated'] === true)
        
        
        for(var key in clients) {
          clientOptions.push({
            label: clients[key].name,
            value: key
          }) 
          
          for(var i=0; i<clients[key].slideIds.length; i++) {
            // console.log(clients[key].slideIds[i])
            for(var j=0; j<entries.length; j++) {
              if(entries[j].id === clients[key].slideIds[i]) {
                entries[j].clients.push({
                  label: clients[key].name,
                  value: key
                })
              }
            }
          }
        }
        
        this.setState({
            entries: entries,
            clientOptions: clientOptions
        })
        
    }
    
    handleClientChange = (clients, row) => {
      
      let i, entries = this.state.entries
      
      for(i=0; i<entries.length; i++) {
        if(entries[i].id === row['id']) {
          entries[i]['clients'] = clients
        }
      }
      console.log(entries)
      
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
    
    updateFormData = (newFormData, row) => {
      let entries = this.state.entries
      for(var i=0; i<entries.length; i++) {
        if(row.id === entries[i].id) {
          entries[i].formData = newFormData.formData
          entries[i].updated = true
        }
      }
      
      this.setState({
        entries: entries
      })
    }
    
    makeSlideChanges = () => {
      let entries = this.state.entries
      for(var i=0; i<entries.length; i++) {
        if(entries[i].updated === true)
          this.props.properties.data.slides[entries[i].id].formData = entries[i].formData
      }
    }
    
    updateClients = () => {
      let entries = this.state.entries
      let clients = this.props.properties.data.clients
      
      for (let i in clients) {
        clients[i].slideIds = []
      }
      
      for(var i=0; i<entries.length; i++) {
        let entry_clients = entries[i].clients
        
        for(var j=0; j<entry_clients.length; j++) {
          clients[entry_clients[j].value].slideIds.push(entries[i].id)
        }
      }
      
      this.makeSlideChanges()
      let slides = JSON.parse(JSON.stringify(this.props.properties.data.slides))
      
      for(var key in slides) {
        slides[key].formData = JSON.stringify(slides[key].formData)
      }
      
      const payload = {
        clients: clients,
        slides: slides
      }
      
      const baseURL = window.location.href.split('#')[0]
      console.log(baseURL)
      
      axios.post(baseURL+"/slides/", payload)
      .then((res) => {
        console.log("Success")
        
        this.setState({
          stackCreateSuccess: true 
        })
      })
      .catch((err) => {
        console.log("Failure")
        
        this.setState({
          stackCreateSuccess: false 
        })
      })
    }

    render() {
        
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
                                      .map((row) => {
                                        return(
                                          <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >

                                            <TableCell>
                                              <Slide
                                                schema={this.state.schema}
                                                uiSchema={this.state.uiSchema}
                                                formData={row.formData}
                                                children={true}
                                                onFormDataChange={(newFormData) => this.updateFormData(newFormData, row)}
                                              />
                                              
                                              <br />
                                              
                                              Clients:
                                              <MultiSelect
                                                options={this.state.clientOptions}
                                                value={row['clients']}
                                                onChange={(option) => this.handleClientChange(option, row)}
                                                style={{width: '80%'}}
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
                        
                        {(this.state.stackCreateSuccess !== "" && this.state.stackCreateSuccess) && 
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="success">{this.state.responseMessage}</Alert>
                            <br />
                          </div>
                        }
                        
                        {(this.state.stackCreateSuccess !== "" && !this.state.stackCreateSuccess) &&
                            <div className="col-md-6 offset-md-3">
                              <br />
                              <Alert severity="error">Error: {this.state.responseMessage}</Alert>
                              <br />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCreateClientStack