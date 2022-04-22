/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [22/03/2022]
 * @updated:
 * @description: Vista del componente Login.
 **/

 import React,{useEffect, useState} from 'react';
 import Header from '../../Header/views/Header';
 import Footer from '../../Footer/views/Footer';
 import useStyles from './styles/Login.style';
 import { 
    Grid, 
    Typography,
    CardContent,
    Paper,
    Divider
} from '@mui/material';
import { useSearchParams  } from 'react-router-dom';
import Video from '../../Video/Video';
import Imagen from '../../Imagen/Imagen';
import { Form } from '../../Form/Form';
import { ClientJS } from 'clientjs';
import { getBrowserId } from "../../Utils/FingerPrint";


 const View = (props) => {

    const [searchParams] = useSearchParams();
    var idQr = searchParams.get('idQr');
    const [resp, setResp]  = useState([]);
    const [value,setValue] = useState("");
    const [urlImg, setUrlImg] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [finger,setFinger]=useState("");

    var client = new ClientJS();
	var dataDevice = client.getBrowserData().ua + client.getOS() + client.getCPU() + client.getSystemLanguage();
    Alert(dataDevice)
    console.log("Data Device", dataDevice);
	console.log("FingerPrint:  "+ getBrowserId() + "-" +client.getCustomFingerprint(dataDevice, null));

   
    if(idQr){
        sessionStorage.setItem("idQr", searchParams.get('idQr'));
    }
    if (sessionStorage.getItem("idQr")){
        idQr = sessionStorage.getItem("idQr")
    }
    const { mt3, paperContainer, title } = useStyles();

    useEffect(() => {
        const   fetchMyAPI = async () =>  {
          //let url = "http://localhost:8089/qrs/4619bc5b-4139-405a-83fb-df6fb1b302ba"
          
          let url = `${process.env.APIURL}${idQr}` 
          const response = await fetch(url);
          const data = await response.json();
        
            if(data.qr.image){
                setUrlImg(data.qr.image)
            }
            setResp(data.qr.action)
            setValue(data.qr.value)
            
            if(data.qr.subcategory){
                const myArray = data.qr.subcategory.split("|");
                setCategory(myArray[1])
            }
         
        }

        if(idQr){
            fetchMyAPI()
            // make sure to catch any error
            .catch(console.error);
        }
        else{
            setError("No hay IDQR")
        }

      }, [])

    return (
        <>
            <Header/>
            <CardContent>
                <Grid container spacing={3}>   
                    <Grid item xs={12} sm={3} lg={4}>
                        <Typography variant='h5' className={title}>
                            Reciclaje
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={mt3}>
                        <Paper className={paperContainer}>
                            <Typography variant='subtitle1' className={title}>
                                Categoría : {category }
                            </Typography>
                            <Divider /> 
                            {
                             resp == '003' ?  <Imagen url={`${urlImg}`} href={`${value}`}/> : ( resp == '002' ? <Video url={`${value}`}/> : <Form val = {`${value}`} />) 
                            }
                            {
                                error ? error:null
                            }

                                                                                 
                        </Paper>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} />
                    
                </Grid>      
            </CardContent>
            <Footer/>
        </>
    );
};

 export default View;