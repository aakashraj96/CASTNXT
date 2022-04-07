import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import Form from '@rjsf/core';

let testForm = {
  "schema": {
    "type": "object",
    "title": "Fall event 22",
    "description": "Some form description",
    "properties": {
      "Personal details": {
        "title": "Personal details",
        "type": "object",
        "description": "Enter your personal details in this section",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string"
          },
          "DOB": {
            "format": "date",
            "title": "DOB",
            "type": "string"
          },
          "gender": {
            "title": "Gender",
            "type": "string"
          },
        },
        "dependencies": {},
        "required": [
          "DOB"
        ]
      }
    },
    "dependencies": {},
    "required": []
  },
  "uischema": {
    "Personal details": {
      "ui:order": [
        "name",
        "DOB",
        "gender"
      ]
    },
    "ui:order": [
      "Personal details"
    ]
  }
}

class UserEventRegister extends Component {
    constructor(props) {
        super(props)
        
        console.log(props)

        this.state = {
            eventId: props.location.state.eventId,
            schema: testForm.schema,
            uischema: testForm.uischema,
            formData: {}
        }
    }
    
    submitForm = () => {
        console.log("Form data", this.state.formData)
    }

    render() {
        
        return(
            <div className="container user-events">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3>Event Registration</h3>
                        <br />
                        
                        <div className="form-preview">
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
                              submitButtonMessage={"Message"}
                            />
                        </div>
                        
                        <br />
                        <button><Link to={{pathname: '/user', state: {}}}>Back</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserEventRegister)