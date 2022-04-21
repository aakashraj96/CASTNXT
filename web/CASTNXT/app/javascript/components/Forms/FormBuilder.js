import React, { Component } from 'react';

import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from '@rjsf/core';
import Slide from './Slide.js';
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
  }
  
  render() {
    console.log(this.state)
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%'}}>
        <div>
          <FormBuilder
            schema={this.props.schema}
            uischema={this.props.uischema}
            onChange={(newSchema, newUiSchema) => {
              this.props.onSchemaChange(newSchema)
              this.props.onUISchemaChange(newUiSchema)
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
                <Slide
                  schema={JSON.parse(this.props.schema)}
                  uiSchema={JSON.parse(this.props.uischema)}
                  formData={this.props.formData}
                  onFormDataChange={this.props.onFormDataChange}
                />
            </div>
        </div>
    );
  }
}

export default FormBuilderContainer