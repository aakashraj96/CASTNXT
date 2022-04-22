import React, {Component} from 'react'
import axios from 'axios';
import Header from '../Navbar/Header';
import FormBuilderContainer from '../Forms/FormBuilder.js'
import Slide from '../Forms/Slide.js'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import './Admin.css';

const mockFormData = {1: {"schema": {
    "type": "object",
    "properties": {
        "name": {
            "title": "name",
            "type": "string"
        },
        "potrait": {
            "title": "potrait",
            "type": "string"
        }
    },
    "dependencies": {},
    "required": []
},
  "uiSchema": {
    "potrait": {
        "ui:widget": "file"
    },
    "ui:order": [
        "name",
        "potrait"
    ]
}
}, 2: {"schema": {
    "type": "object",
    "properties": {
        "name": {
            "title": "name",
            "type": "string"
        },
        "Height": {
            "title": "Height",
            "type": "string"
        },
        "Weight": {
            "title": "Weight",
            "type": "string"
        }
    },
    "dependencies": {},
    "required": []
},
  "uiSchema": {
    "potrait": {
        "ui:widget": "file"
    },
    "ui:order": [
        "name",
        "Height",
        "Weight"
    ]
}
},
3: {"schema": {
    "type": "object",
    "properties": {
        "name": {
            "title": "name",
            "type": "string"
        },
        "Height": {
            "title": "Height",
            "type": "string"
        }
    },
    "dependencies": {},
    "required": []
},
  "uiSchema": {
    "potrait": {
        "ui:widget": "file"
    },
    "ui:order": [
        "name",
        "Height"
    ]
}
}
}

const mockClients = [{
  id: 1,
  name: 'client1@gmail.com'
}, {
  id: 2,
  name: 'client2@gmail.com'
}, {
  id: 3,
  name: 'client3@gmail.com'
}]

const mockFormIds = [1,2,3]

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class AdminCreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: "",
            selectedTab: 0,
            selectedFormNo: null,
            selectedClients: [],
            schema: '{}',
            uischema: '{}',
            formData: {},
            title: '',
            description: '',
            formIds: [],
            clients: [],
            formData: null
        }
    }
    
    handleTabChange = (event, newValue) => {
        this.setState({
            ...this.state,
            selectedTab: newValue
        })
      };
    
    onFormDataChange = (newFormData) => {
      this.setState((prevState) => {
          return {
              ...prevState,
              formData: newFormData.formData
          }
      })
    }
    
    onSchemaChange = (newSchema) => {
      this.setState((state) => {
        return {
          ...state,
          schema: newSchema
        }
      })
    }
    
    onUISchemaChange = (newUISchema) => {
      this.setState((state) => {
        return {
          ...state,
          uischema: newUISchema
        }
      })
    }
    
    onTitleChange = (event) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          title: event.target.value
        }
      })
    }
    
    onDescriptionChange = (event) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          description: event.target.value
        }
      })
    }
    
    onFormLoadClick = () => {
      console.log('Selected form to load: ', this.state.selectedFormNo)
      axios.get(`/admin/form/${this.state.selectedFormNo}`)
            .then((res) => {
              console.log("Form call success", res)
                this.setState({
                    formData: properties.formData
                })
            })
            .catch((err) => {
              console.log("Form call fail")
                this.setState({
                    formData: mockFormData[this.state.selectedFormNo]
                })
            })
    }
    
    componentDidMount() {
      console.log("Properties: ", properties)
      axios.get("/admin/event/new")
            .then((res) => {
              console.log("Did mount success", res)
                this.setState({
                    clients: properties.clients,
                    formIds: properties.formIds
                })
            })
            .catch((err) => {
              console.log("Did mount fail")
                this.setState({
                    clients: mockClients,
                    formIds: mockFormIds
                })
            })
    }

    render() {
        
        let borderstyle = {
            border: '1px solid black',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px'
        }
        
        console.log('State: ', this.state)
        
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div style={{minHeight: '100vh', backgroundColor: 'white'}}>
                    <h2>Create New Event</h2>
                    
                    <div className="container" style={{ backgroundColor: 'white', height: '100%', width: '50vw', paddingTop: '1%' }}>
                        <p>Use this page to create a new event by choosing the clients and the form that need to be used</p>
                        <p>Step 1</p>
                        <div className="input-fields">
                          <TextField id="outlined-basic" label="Event title" variant="outlined" onChange={this.onTitleChange} value={this.state.title} />
                          <TextField id="outlined-basic" label="Event description" variant="outlined" onChange={this.onDescriptionChange} value={this.state.description}/>
                        </div>
                        <p>Step 2</p>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Clients for this event</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Clients for this event"
                            multiple
                            value={this.state.selectedClients}
                            onChange={(event)=>{this.setState((state) => {
                                    return {selectedClients: event.target.value};
                                  });
                                  }}
                          >
                            {this.state.clients.map(client => {
                              return (
                                <MenuItem value={client.id}>{client.name}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                        <br/><br/>
                        <p>Step 3</p>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange} aria-label="basic tabs example">
                            <Tab label="Choose from existing forms" {...a11yProps(0)} />
                            <Tab label="Create new form" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <TabPanel value={this.state.selectedTab} index={0}>
                            <div className="flex-row">
                            <div style={{flex:1, marginRight:'10px'}}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Form number</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Form number"
                                  onChange={(event)=>{this.setState((state, props) => {
                                    return {selectedFormNo: event.target.value, formData: null};
                                  });
                                  }}
                                >
                                 {this.state.formIds.map(formId => {
                                    return (
                                      <MenuItem value={formId}>Form {formId}</MenuItem>
                                    )
                                  })}
                                </Select>
                              </FormControl>
                              </div>
                              <Button variant="contained" style={{flex:1}} onClick={this.onFormLoadClick}>Load this form</Button>
                            </div>
                            {this.state.selectedFormNo && this.state.formData &&
                            <div style={{marginTop: '20px'}}>
                            <h4> Form template preview </h4>
                            <Slide
                              schema={this.state.formData.schema}
                              uiSchema={this.state.formData.uiSchema}
                              formData={{}}
                              onFormDataChange={() => {}}
                            />
                            </div>}
                        </TabPanel>
                        <TabPanel value={this.state.selectedTab} index={1}>
                          <FormBuilderContainer 
                            schema={this.state.schema}
                            uischema={this.state.uischema} 
                            onSchemaChange={this.onSchemaChange}
                            onUISchemaChange={this.onUISchemaChange}
                            onFormDataChange={this.onFormDataChange}
                            formData={this.state.formData}
                          />
                        </TabPanel>
                        <Button variant="contained">Create Event</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCreateEvent