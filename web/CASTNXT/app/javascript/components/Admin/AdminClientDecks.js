import React, {Component} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slide from '../Forms/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

class AdminClientDecks extends Component {
    constructor(props) {
        super(props)
        
        console.log(props)
        
        this.state = {
            client: '',
            clientOptions: [],
            clientList: props.properties.data.clients,
            clientDecks: {},
            slides: props.properties.data.slides,
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uischema !== undefined ? props.properties.data.uischema : [],
            page:0,
            rowsPerPage: 1,
        }
    } 
    
    componentDidMount = () => {
        let clientOptions = []
        let clients = this.state.clientList
        let slides = this.state.slides
        let clientDecks = {}
        let schema = this.state.schema
        
        schema['title'] = this.props.properties.data.title
        schema['description'] = this.props.properties.data.description
        
        for(var key in clients) {
            clientOptions.push(
                <MenuItem key={key} value={key}>{clients[key].name}</MenuItem>    
            )
            
            clientDecks[key] = []

            for(var i=0; i<clients[key].slideIds.length; i++) {
                clientDecks[key].push({
                  ...this.state.slides[clients[key].slideIds[i]],
                  id: clients[key].slideIds[i]
                })
            }
        }

        
        this.setState({
            schema: schema,
            clientOptions: clientOptions,
            clientDecks: clientDecks,
        }, () => {
            console.log(this.state)
        })
    }
    
    handleClientChange = (clientSelection) => {
        this.setState({
            client: clientSelection.target.value
        })
    }
    
    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    };
    
    handleChangeRowsPerPage = (event, num) => {
      this.setState({
        rowsPerPage: event.target.value
      })
    }
    
    render() {
        return(
            <div>
                <br />
                <FormControl variant="standard">
                    <p>Select a client below to view his slide deck</p>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      options={this.state.clientOptions}
                      value={this.state.client}
                      onChange={(option) => this.handleClientChange(option)}
                      label="Select Client"
                      autoWidth
                    >
                        {this.state.clientOptions}
                    </Select>
                </FormControl>
                
                <br />
                
                {this.state.client !== "" &&
                    <div>
                        <div className="col-md-8 offset-md-2">
                            <Paper>
                            <TableContainer>
                              <Table size="medium">
                                <TableBody>
                                  {this.state.clientDecks[this.state.client]
                                      .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                      .map((row) => {
                                        return(
                                          <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >

                                            <TableCell>
                                              <Slide
                                                disabled
                                                schema={this.state.schema}
                                                uiSchema={this.state.uiSchema}
                                                formData={row.formData}
                                                children={true}
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
                                      count={this.state.clientDecks[this.state.client].length}
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
                    </div>
                }
            </div>
        )
    }
}

export default AdminClientDecks