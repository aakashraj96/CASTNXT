import React, { Component } from 'react';

import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from '@rjsf/core';
import './Forms.css';

const customFormInputs = {
  array: {
    displayName: "File",
    matchIf: [
      {
        types: ["string"],
        widget: "file"
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "file"
    },
    type: "string",
    format: "data-url",
  },
};

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: '{}',
      uischema: '{}',
      formData: {}
    };
  }
  render() {
    console.log(this.state)
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%'}}>
        <div>
          <FormBuilder
            schema={this.state.schema}
            uischema={this.state.uischema}
            onChange={(newSchema, newUiSchema) => {
              this.setState({
                schema: newSchema,
                uischema: newUiSchema
              })
            }}
            mods={
              {
                customFormInputs
              }
            }
          />
          </div>
          <div className="form-preview">
                <p className="preview-title">Form preview: </p>
              <Form
                  schema={JSON.parse(this.state.schema)}
                  uiSchema={JSON.parse(this.state.uischema)}
                  onChange={(newFormData) => this.setState((prevState) => {
                      return {
                          ...prevState,
                          formData: newFormData.formData
                      }
                  })}
                  formData={this.state.formData}
                  submitButtonMessage={"Submit"}
                />
            </div>
        </div>
    );
  }
}

export default FormBuilderContainer