import React, {Component} from 'react'
import Header from '../Navbar/Header';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

class AdminAddClient extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: "",
            email: "",
            nameError: false,
            emailError: false,
            defaultPassword: '12345678',
            signUpError: false,
            clientCreateSuccess: ""
        }
    }
    
    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    createClient = () => {
        //Error Validation
        let errors = false
        let email = this.state.email
        let emailValid = email.toLowerCase() .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                                
        if(!emailValid) {
            this.setState({
                emailError: true
            })
            errors = true
        }
        
        // If there are no errors, call sign up api to add the new user
        if(!errors) {
            this.setState({
                emailError: false
            })
            
            let name = this.state.name
            let email = this.state.email
            let password = this.state.defaultPassword
            let role = 'client'
            
            //Make API call
            axios.post("/home/signup", {
                name: name,
                email: email,
                password: password,
                type: role,
                adminAdd: true
            })
            .then((res) => {
                console.log("Succesfully added new client", res)
                this.setState({
                    clientCreateSuccess: true
                })
            })
            .catch((err) => {
                console.log("Error", err.response)
                this.setState({
                    signUpError: true
                })
                
            })
        }
    }
    
    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="container user-events">
                    <div className="row" style={{overflowY: 'auto', backgroundColor: 'white', height: '100%'}}>
                        <h2>Add Client</h2>
                        <hr />
                        <span>Fill in the details below to add a new client</span><br /><br/>
                        
                        <div className="col-md-6 offset-md-3">
                            <div>
                                <TextField size="small" focused style={{ width: '60%' }} name="name" type="text" label="Name" value={this.state.name} 
                                    onChange={this.handleChange} /><br /><br />
                                    
                                <TextField size="small" focused style={{ width: '60%' }} name="email" type="email" label="Email" value={this.state.email} 
                                    error={this.state.emailError} helperText={this.state.emailError ? "Enter a valid email address" : ""} 
                                    onChange={this.handleChange} /><br /><br />
                                        
                                <Button variant="contained" onClick={this.createClient}>Submit</Button>&nbsp;
                                <Button variant="contained" onClick={() => {window.location.href="/admin"}}>Back</Button>
                                
                                {this.state.signUpError &&
                                    <div style={{color: 'red'}}>
                                        <br />
                                        <Alert severity="error">Error: An account with the given Email already exists.</Alert>
                                        <br />
                                    </div>
                                }
                                
                                {this.state.clientCreateSuccess &&
                                    <div>
                                        <br />
                                        <Alert severity="success">Succesfully added the client</Alert>
                                        <br />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default AdminAddClient