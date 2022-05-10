import React from 'react'
import Component from "mson-react/lib/component";


export const Form = (props) => {

  console.log("ValueForm",props.val)

  var resp = JSON.parse(props.val)
  resp.push({
    name: "submit",
    component: "ButtonField",
    type: "submit",
    label: "Submit",
    icon: "Save"
  },
  {
    name: "reset",
    component: "ButtonField",
    label: "Reset",
    icon: "Clear"
  }) 

  const definition = {
    component: "Form",
    fields: resp,
    validators: []
  };

  return (
    /*<div dangerouslySetInnerHTML={{ __html: props.val }}>
    </div>*/
      <Component
      definition={definition}
      
      // Clear the form
      onReset={({ component }) => component.reset()}
      onSubmit={({ component }) => {
        // TODO: Contact some API with the data
        //console.log("DATAJSON",definition)
        //console.log("submitting", component.getValues());
  
        // Simulate response from API saying that email address is already in use and report this
        // error to the user
        if (component.get("fields.email.value") === "taken@example.com") {
          component.set({ "fields.email.err": "already in use" });
        } else {
          // Everything was successful so redirect, show confirmation, etc...
        }
      }}
    />
  )
}
