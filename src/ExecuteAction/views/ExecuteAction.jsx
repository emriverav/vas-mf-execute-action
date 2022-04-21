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

 const View = (props) => {

    const [searchParams] = useSearchParams();
    let idQr = searchParams.get('idQr');
    const [resp, setResp]  = useState([]);
    const [value,setValue] = useState("");
    const [urlImg, setUrlImg] = useState("");
    const [category, setCategory] = useState("");

    const getBrowserId = () =>{
        let client = new ClientJS();
        let browserId = "00";
        
        // Opera 8.0+
        let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Firefox 1.0+
        let isFirefox = typeof InstallTrigger !== 'undefined';
        // Safari 3.0+ "[object HTMLElementConstructor]" 
        let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        // Internet Explorer 6-11
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
        let isEdge = !isIE && !!window.StyleMedia;
        // Chrome 1 - 79
        let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        // Edge (based on chromium) detection
        let isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    
        if(client.isFirefox()){
            browserId = "01";
        }
        if(client.isChrome()){
            browserId = "02";
        }
        if(client.isOpera()){
            browserId = "03";
        }
        if(client.isSafari() || client.isMobileSafari()){
            browserId = "04";
        }
        if(isEdge || isEdgeChromium){
            browserId = "05";
        }
        if(client.isIE()){
            browserId = "06";
        }
        return browserId;
    };

    let client = new ClientJS();
	let dataDevice = client.getBrowserData().ua + client.getOS() + client.getCPU() + client.getSystemLanguage();
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
        
          const myArray = data.qr.subcategory.split("|");
          
          setCategory(myArray[1])
          
        }
    
        fetchMyAPI()
        // make sure to catch any error
        .catch(console.error);

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