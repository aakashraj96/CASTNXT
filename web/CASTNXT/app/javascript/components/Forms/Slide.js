import React, { Component } from 'react';
import Form from '@rjsf/core';
import './Forms.css';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: props.schema,
      uiSchema: props.uiSchema,
      formData: props.formData,
      fields: {}
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    let uiSchemaCopy = Object.assign({}, props.uiSchema)
    let fieldsCopy = Object.assign({}, state.fields)
    let schemaCopy = Object.assign({}, props.schema)
    Object.keys(props.formData).forEach(key => {
      console.log("Key: ",key, props.formData[key])
      if(props.formData && typeof props.formData[key] === 'string' && props.formData[key].includes("data:image")) {
        console.log("Image found",key);
        let fieldIndex = uiSchemaCopy['ui:order'].indexOf(key)
        let uiOrder = [
          ...uiSchemaCopy['ui:order'].slice(0, fieldIndex+1),
          `img_${key}`,
          ...uiSchemaCopy['ui:order'].slice(fieldIndex+1)
        ]
        uiSchemaCopy = {
          ...uiSchemaCopy,
          [`img_${key}`] : {
            "ui:widget": () => (
              <div>
                <img style={{maxWidth: '80%'}} src={props.formData[key]}/>
              </div>
            )
          },
          'ui:order': uiOrder
        }
        schemaCopy = {
          ...schemaCopy,
          properties: {
            ...schemaCopy.properties,
            [`img_${key}`]: {title: 'Uploaded image', type: 'string'}
          }
        }
      }
    })
      return {
            ...state,
            schema: schemaCopy,
            uiSchema: uiSchemaCopy,
            formData: props.formData,
            fields: fieldsCopy
      }
  }
  
  render() {
    console.log('inside slide: ', this.state)
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%'}}>
          <Form
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              onChange={this.props.onFormDataChange}
              formData={this.state.formData}
              submitButtonMessage={"Submit"}
              onSubmit={this.props.onSubmit}
            />
        </div>
    );
  }
}

export default Slide