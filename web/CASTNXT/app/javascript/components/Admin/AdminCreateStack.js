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
import Alert from '@mui/material/Alert';
import Slide from '../Forms/Slide';
import axios from 'axios';

class AdminCreateStack extends Component {
    constructor(props) {
        super(props)
        
        console.log("Rails properties", props.properties)

        this.state = {
            properties: props.properties,
            redirect: "",
            title: props.properties.data.title,
            description: props.properties.data.description,
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uiSchema !== undefined ? props.properties.data.uiSchema : [],
            formData: [],
            entries: [],
            curatedStack: [],
            showStack: false,
            client: '',
            page:0,
            rowsPerPage: 1,
            stackCreateSuccess: "",
            responseMessage: ""
        }
    }
    
    componentDidMount() {
      let entries = []
      let slides = this.props.properties.data.slides
      let schema = this.state.schema

      schema['title'] = this.props.properties.data.title
      schema['description'] = this.props.properties.data.description
      
      for(var key in slides) {
        entries.push({
          ...slides[key],
          id: key,
          updated: false
        }) 
      }
      
      this.setState({
        entries: entries,
        schema: schema,
      })
    }
    
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
    addToStack = (row) => {

      let curStack = this.state.entries
      
      for(var i=0; i<curStack.length; i++) {
        if(curStack[i]['id'] === row['id']) {
          curStack[i]['curated'] = !curStack[i]['curated']
        }
      }
      
      this.setState({
        entries: curStack
      })
      
    }
    
    makeStack = () => {
      let curStack = this.state.entries
      let stack = []
      
      for(var i=0; i<curStack.length; i++) {
        if(curStack[i]['curated']) {
          stack.push(curStack[i])
        }
      }
      
      this.setState({
        curatedStack: stack,
        showStack: true
      }, () => {
        // document.getElementById('curated').focus()
        window.location.hash = "#curated"
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
      console.log(newFormData)
      
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
    
    makeMasterStack = () => {
      let curatedStack = this.state.curatedStack
      
      this.makeSlideChanges()
      
      for(var i=0; i<curatedStack.length; i++) {
        // console.log(properties.data.slides[curatedStack[i].id])
        this.props.properties.data.slides[curatedStack[i].id]['curated'] = true
        
      }
      
      for(var key in this.properties.data.slides) {
        this.properties.data.slides[key].formData = JSON.stringify(this.properties.data.slides[key].formData)
      }
      
      const baseURL = window.location.href.split('#')[0]
      console.log(baseURL)
      
      const payload = {
        clients: this.props.properties.data.clients,
        slides: this.props.properties.data.slides
      }
      
      axios.post(baseURL+"/slides/", payload)
      .then((res) => {
        console.log("Success")
        
        this.setState({
          stackCreateSuccess: true,
          responseMessage: res.data.comment
        })
      })
      .catch((err) => {
        console.log("Failure")
        
        this.setState({
          stackCreateSuccess: false,
          responseMessage: 'An error occured when making master deck'
        })
      })
    }

    render() {
        
        return(
            <div>

                <div style={{marginTop: '1%'}}>
                    <p>Use this page to create a master slide deck for this event.</p>
                    
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
                                            key={index}
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
                                              
                                              <div style={{textAlign: 'right'}}>
                                                {!row.curated? (
                                                  <Button onClick={() => this.addToStack(row)} variant="contained" color="success">Add</Button>
                                                ) : (
                                                  <Button onClick={() => this.addToStack(row)} variant="contained" color="error">Remove</Button>
                                                )}
                                              </div>
                                              
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

                      <Button variant="contained" onClick={this.makeStack}>Make Stack</Button>
                      
                      <br /><br />
                      
                      {this.state.showStack &&
                        <div tabIndex="-1" id="curated">
                        <hr />
                          <table>
                            <thead>
                              <tr><td>Current Stack</td></tr>
                            </thead>
                            <tbody>
                              {this.state.curatedStack.map((row, index) => {
                              console.log(row)
                                  return(
                                    <tr key={index}>
                                      <td>{row.talentName}</td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                          <br />
                          
                          <Button variant="contained" onClick={this.makeMasterStack}>Submit</Button><br /><br />
                          <hr />
                        </div>
                      }
                      
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

export default AdminCreateStack