import React, {Component} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            loginEmail: "",
            loginPassword: "",
            role: "user",
            nameError: false,
            emailError: false,
            passwordError: false,
            loginError: false,
            passwordErrorText: "",
            tabValue: 0,
            signUpError: false
        }
    }

    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        })
    }

    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = () => {
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
        
        // Check if password and confirm password match
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({
                passwordError: true,
                passwordErrorText: "The passwords must match"
            })
            errors = true
        }
        // Check if the length of the password is at least 8 chars
        else if(this.state.password.length < 8) {
            this.setState({
                passwordError: true,
                passwordErrorText: "The minimum length of the password is 8 characters"
            })
            errors = true
        }
        
        // If there are no errors, call sign up api to add the new user
        if(!errors) {
            this.setState({
                passwordError: false,
                emailError: false
            })
            
            let name = this.state.name
            let email = this.state.email
            let password = this.state.password
            let role = this.state.role
            
            //Make API call
            axios.post("/home/signup", {
                name: name,
                email: email,
                password: password,
                type: role
            })
            .then((res) => {
                sessionStorage.setItem('userId', res.data.userId);
                window.location.href = res.data.redirect_path;
            })
            .catch((err) => {
                this.setState({
                    signUpError: true
                })
                
            })
        }
    }

    login = () => {
        let email = this.state.loginEmail
        let password = this.state.loginPassword
        
        axios.post("/home/login", {
                email: email,
                password: password
            })
            .then((res) => {
                this.setState({
                    loginError: false
                })
                sessionStorage.setItem('userId', res.data.userId);
                window.location.href = res.data.redirect_path;
            })
            .catch((err) => {
                this.setState({
                    loginError: true
                })
            })
    }

    render() {

        let imageStyle = { 
            padding: '1.2%', 
            textAlign: 'center', 
            backgroundColor:'black', 
            display: 'inline-block'
        }

        return (
            <div>
                <div className="container">
                    <div style={imageStyle} className='centered'>
                        <img src={require('../../assets/images/logo.png')} alt="FASHIONXT" style={{ width: '300px' }} />
                    </div>
                    <div className="row" style={{ color: 'white' }}>
                        <div className="col-md-6 offset-md-3 login-box">
                            <div>
                                <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                    <Tab style={{focus: "color: #719ECE"}} label="Login" />
                                    <Tab label="Sign Up" />
                                </Tabs>
                                <hr style={{ color: 'black' }} />
                            </div>

                            {this.state.tabValue === 0 &&
                                <div className="login-background">
                                    <TextField focused style={{ width: '60%' }} name="loginEmail" 
                                        type="email" label="Email" value={this.state.loginEmail} onChange={this.handleChange} /><br /><br />
                                    <TextField focused style={{ width: '60%' }} name="loginPassword" 
                                        type="password" label="Password" value={this.state.loginPassword} onChange={this.handleChange} /><br /><br />
                                    <Button variant="contained" onClick={this.login}>Login</Button>
                                    {this.state.loginError && 
                                        <div>
                                            <br />
                                            <span style={{color: 'red'}}>The entered Username or Password is incorrect.</span>
                                        </div>
                                    }
                                </div>
                            }

                            {this.state.tabValue === 1 &&
                                <div className="login-background" style={{overflowY: 'auto'}}>
                                    <FormControl style={{ textAlign: 'center', color: 'black' }}>
                                        <FormLabel>Welcome to CastNXT! Please select your role</FormLabel>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <RadioGroup
                                                row
                                                name="role"
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                defaultValue="user"
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel value="USER" control={<Radio />} label="User" />
                                                <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                                <FormControlLabel value="CLIENT" control={<Radio />} label="Client" />
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                    <br /><br />
                                    <TextField size="small" focused style={{ width: '60%' }} name="name" type="text" label="Name" value={this.state.name} 
                                        onChange={this.handleChange} /><br /><br />
                                        
                                    <TextField size="small" focused style={{ width: '60%' }} name="email" type="email" label="Email" value={this.state.email} 
                                        error={this.state.emailError} helperText={this.state.emailError ? "Enter a valid email address" : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                            
                                    <TextField size="small" focused style={{ width: '60%' }} name="password" type="password" label="Password" value={this.state.password} 
                                        error={this.state.passwordError} helperText={this.state.passwordError ? this.state.passwordErrorText : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                            
                                    <TextField size="small" focused style={{ width: '60%' }} name="confirmPassword" type="password" label="Confirm Password" value={this.state.confirmPassword} 
                                        error={this.state.passwordError} helperText={this.state.passwordError ? this.state.passwordErrorText : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                    
                                    <Button className="sign-up-button" variant="contained" onClick={this.signUp}>Sign Up</Button>
                                    
                                    {this.state.signUpError &&
                                        <div style={{color: 'red'}}>
                                            <br />
                                            <span>An account with the given Email already exists.</span>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage