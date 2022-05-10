import React, {useState} from 'react'
import Component from "mson-react/lib/component";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1.5px solid #e10098',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};

export const Form = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <> 
      <Component
      definition={definition}
      
      // Clear the form
      onReset={({ component }) => component.reset()}
      onSubmit={({ component }) => {
        handleOpen()
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h8" component="h4">
              ¡Tus datos fueron enviados!
            </Typography>
          
          </Box>
        </Fade>
      </Modal> 
 
    
    </>
   
  )
}
