import React, {Component} from 'react'
import Header from '../Navbar/Header';
import FormBuilderContainer from '../Forms/FormBuilder.js'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

class AdminCreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: "",
        }
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
                
                <div style={{marginTop: '3%', backgroundColor: 'white'}}>
                    <h1>Admin: Create form</h1>
                    

                    <div className="container" style={{ backgroundColor: 'white', height: '100%', width: '50vw', paddingTop: '1%' }}>
                        
                        <div style={{ color: 'white' }}>
                            <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                <Tab style={borderstyle} label="Performers" />
                                <Tab style={borderstyle} label="Forms" />
                                <Tab style={borderstyle} label="Stacks" />
                                <Tab style={borderstyle} label="Curated" />
                                <Tab style={borderstyle} label="Final List" />
                            </Tabs>
                            <br />
                        </div>
    
                        <br />
                        <p>Use this page to create a new form</p>
                        <FormBuilderContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCreateEvent