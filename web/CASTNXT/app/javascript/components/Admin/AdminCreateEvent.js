import React, {Component} from 'react'
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
}
}

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
            formData: {}
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

    render() {
        
        let borderstyle = {
            border: '1px solid black',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px'
        }
        
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
                          <TextField id="outlined-basic" label="Event title" variant="outlined" />
                          <TextField id="outlined-basic" label="Event description" variant="outlined" />
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
                            <MenuItem value={10}>client1@gmail.com</MenuItem>
                            <MenuItem value={20}>client2@gmail.com</MenuItem>
                            <MenuItem value={30}>client3@gmail.com</MenuItem>
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
                                    return {selectedFormNo: event.target.value};
                                  });
                                  }}
                                >
                                  <MenuItem value={1}>Form 1</MenuItem>
                                  <MenuItem value={2}>Form 2</MenuItem>
                                </Select>
                              </FormControl>
                              </div>
                              <Button variant="contained" style={{flex:1}}>Choose this form</Button>
                            </div>
                            {this.state.selectedFormNo &&
                            <div style={{marginTop: '20px'}}>
                            <h4> Form template preview </h4>
                            <Slide
                              schema={mockFormData[this.state.selectedFormNo].schema}
                              uiSchema={mockFormData[this.state.selectedFormNo].uiSchema}
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