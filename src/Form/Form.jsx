import React, {useState} from 'react'
import Component from "mson-react/lib/component";
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {getWellFormedField} from '../Utils/getWellFormedField'

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
  var formatteJson = resp.map((item,index)=>getWellFormedField(item))
  formatteJson.push({
    name: "submit",
    component: "ButtonField",
    type: "submit",
    label: "Enviar",
    icon: "Save"
  },
  {
    name: "reset",
    component: "ButtonField",
    label: "Limpiar",
    icon: "Clear"
  }) 
  const definition = {
    component: "Form",
    fields: formatteJson,
    validators: []
  };

  const  fetchCustomers = async (obj) =>  {
   let objToSend = {
    "idCat": props.idCat ,
    "subcategory": props.SubCat,
    "idQr": props.idQr,
    "dataForm": obj
    } 

    const optionsPost = { 
      method: 'POST', 
      body: JSON.stringify(objToSend),
      headers: {
            'Content-Type': 'application/json'
          }    
    };
    try {
      let url = `${process.env.APICUSTOMERS}` 
      const response = await fetch(url,optionsPost);

      if (response.status == 200) {
          const data = await response.json();          
  
        } else {
          throw  new Error(response.status);
        }
   
    } catch(err) {
      // atrapa errores tanto en fetch como en response.json
      console.log("Error Peticion ", err );
  
    }
  }

  const  fetchSendNotification = async (idform, email) =>  {

     try {
       let url = `${process.env.APISENDNOFICATION}${idform}/${email}`+'/3';
       const response = await fetch(url);
 
       if (response.status == 200) {
           const data = await response.json();          
         } else {
           throw  new Error(response.status);
         }
    
     } catch(err) {
       // atrapa errores tanto en fetch como en response.json
       console.log("Error Peticion ", err );
   
     }
   }
  

  return (
    <> 
      <Component
      definition={definition}
      
      // Clear the form
      onReset={({ component }) => component.reset()}
      onSubmit={({ component }) => {
        handleOpen()
        // TODO: Contact some API with the data
        //console.log("FORMEMAIL",component.get("fields.email.value"))
        //console.log("submitting", component.getValues());
        fetchCustomers(component.getValues())
        // Simulate response from API saying that email address is already in use and report this
        // error to the user
        if (component.get("fields.email.value") !== "" ) {
          fetchSendNotification(props.idForm, component.get("fields.email.value") ) 
        } else {
          component.set({ "fields.email.err": "Email no agregado" });
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
          <IconButton sx={{
            position: 'absolute',
            right: 6,
            top: 6,
            color: '#000',
          }} onClick={handleClose}>
                          <CloseIcon />
              </IconButton>
            <Typography id="modal-modal-title" variant="h8" component="h4">
              ¡Tus datos fueron enviados!
            </Typography>
          
          </Box>
        </Fade>
      </Modal> 
 
    
    </>
   
  )
}
