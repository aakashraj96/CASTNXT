import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import Form from '@rjsf/core';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

class UserEventRegister extends Component {
    constructor(props) {
        super(props)
        
        console.log(properties)

        this.state = {
            eventId: properties.data.id,
            title: properties.data.title,
            description: properties.data.description,
            schema: properties.data.schema !== undefined ? properties.data.schema : {},
            uischema: properties.data.uischema !== undefined ? properties.data.uischema : {},
            formData: properties.data.formData !== undefined ? properties.data.formData : {},
            registerStatus: '',
            registerMessage: ''
        }
    }
    
    submitForm = () => {
        console.log(this.state.formData)
        const baseURL = window.location.href

        axios.post(baseURL + "/slides", {
            formData: JSON.stringify(this.state.formData)
        })
        .then((res) => {
            console.log("Success", res)
            
            this.setState({
                registerStatus: res.status,
                registerMessage: res.data.comment
            })
            
            setTimeout(() => {
                window.location.href = "/user"
            }, 2500)
        })
        .catch((err) => {
            console.log(err)
            
            this.setState({
                registerStatus: err.response.status,
                registerMessage: err.response.data.comment
            })
            
            if(err.response.status === 403) {
                window.location.href = err.response.data.redirect_path
            }
        })
    }
    
    back = () => {
        window.location.href = "/user"
    }

    render() {
        
        return(
            <div className="container user-events">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Button variant="outlined" onClick={this.back} style={{float: 'right', marginTop: "1%"}}>Back</Button>
                        <h3>Event Registration</h3>
                        <br />
                        
                        <div className="form-preview">
                            <h3>{this.state.title}</h3>
                            <span>{this.state.description}</span>
                            <Form
                              schema={this.state.schema}
                              uiSchema={this.state.uischema}
                              onChange={(newFormData) => this.setState((prevState) => {
                                  return {
                                      ...prevState,
                                      formData: newFormData.formData
                                  }
                              })}
                              formData={this.state.formData}
                              onSubmit={this.submitForm}
                            />
                        </div>
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus===200) &&
                            <div>
                                <br />
                                <Alert severity="success">{this.state.registerMessage}</Alert>
                                <br />
                            </div>
                        }
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus===201) &&
                            <div>
                                <br />
                                <Alert severity="success">{this.state.registerMessage}</Alert>
                                <br />
                            </div>
                        }
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus===400) &&
                            <div>
                                <br />
                                <Alert severity="error">Error: {this.state.registerMessage}</Alert>
                                <br />
                            </div>
                        }
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus===403) &&
                            <div>
                                <br />
                                <Alert severity="error">Error: {this.state.registerMessage}</Alert>
                                <br />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserEventRegister)