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
import { getBrowserId,getDevice } from "../../Utils/FingerPrint";


 const View = (props) => {
    const [searchParams] = useSearchParams();
    var idQr = searchParams.get('idQr');
    const [resp, setResp]  = useState([]);
    const [value,setValue] = useState("");
    const [urlImg, setUrlImg] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState([]);
    const [address, setAddress]= useState("");
    const [errorGeolocation, setErrorGeo]=useState("");
    const [geolocation,setGeolocation] =useState([]);

  

    var client = new ClientJS();
	  var dataDevice = client.getBrowserData().ua + client.getOS() + client.getCPU() + client.getSystemLanguage();
    //console.log("Data Device", dataDevice);
    var device = getDevice();
    var finger = getBrowserId() + "-" +client.getCustomFingerprint(dataDevice, null);
	//console.log("FingerPrint:  "+ getBrowserId() + "-" +client.getCustomFingerprint(dataDevice, null));
    if(idQr){
        sessionStorage.setItem("idQr", searchParams.get('idQr'));
        const url = '/execute/action/';    
        history.pushState('', '', url)
    }
    if (sessionStorage.getItem("idQr")){
        idQr = sessionStorage.getItem("idQr")
    }

    const { mt3, paperContainer, title } = useStyles();  
    


    useEffect(() => {
        const   fetchMyAPI = async () =>  {
          //let url = "http://localhost:8089/qrs/4619bc5b-4139-405a-83fb-df6fb1b302ba"
        
          try {
            let url = `${process.env.APIURL}${idQr}` 
            const response = await fetch(url);
    
            if (response.status == 200) {
                const data = await response.json();

                if(data && data.qr.image){
                    setUrlImg(data.qr.image)
                }
                setResp(data.qr)
                setValue(data.qr.value)
                
                if(data && data.qr.subcategory){

                    setCategory( data.qr.subcategory)
                }
               
              } else {
                throw  new Error(response.status);
              }
         
          } catch(err) {
            // atrapa errores tanto en fetch como en response.json
            console.log("Error Peticion ", err );
            //setError(err)
          }
        
        }

        if(idQr){
            fetchMyAPI()
            
        }
        else{
            setError("No hay IDQR")
        }

        initialize();
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
            //console.log('Your current position is:');
            //console.log(`Latitude : ${crd.latitude}`);
            //console.log(`Longitude: ${crd.longitude}`);
            codeAddress(crd.latitude, crd.longitude)
            //setGeolocation([{"latitude" : crd.latitude}, {"longitude" :crd.longitude }])
            
            //console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            setErrorGeo(`ERROR(${err.code}): ${err.message}`)
          }
          
        navigator.geolocation.getCurrentPosition(success, error, options);

      }, [])

      
  var geocoder, map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress(longitud, latitud) {
    //console.log("Detect", longitud+","+latitud)
    var address = (longitud+","+latitud);
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
         //console.log("mapaComplet",results)
         setAddress(results[1].formatted_address)
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        setErrorGeo('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


    //obj = { "typeDevice" : device, "subcategory": category, "id_qr": idQr, "latitude" : "", "longitude" :"", "idAction" : resp.action, "idCat": resp.idCat, "idForm": "", finger };
    //console.log(obj)
    //sessionStorage.setItem("dataMetrics",JSON.stringify(obj))

    var obj ={
    "description": "Acción by Erick 2",
    "address": address,
    "addressState": "",
    "addressZipCode": "",
    "date": "28/04/2022 MM/DD/YYYY",
    "fingerPrint": finger,
    "idAction": resp.action,
    "idCat": resp.idCat,
    "idForm": "",
    "id_qr": idQr,
    "latitude": "",
    "longitude": "",
    "subcategory": category,
    "typeDevice":  device 
  }
 
  console.log(obj)

  async function addMetrics() {

    const optionsPost = { 
      method: 'POST', 
      body: JSON.stringify(obj),
      headers: {
            'Content-Type': 'application/json'
          }    
    };


    try {
      let response = await fetch(`${process.env}`, optionsPost);
      //let insertResp = await response.json();
      //console.log(insertResp)
    } catch(err) {
      // atrapa errores tanto en fetch como en response.json
      alert(err);
    }
  }


  addMetrics()

  
  
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
                                Categoría : {  category.split("|")[1] }
                            </Typography>
                            <Divider /> 
                            {
                             resp == '003' ?  <Imagen url={`${urlImg}`} href={`${value}`}/> : ( resp == '002' ? <Video url={`${value}`}/> : <Form val = {`${value}`} />)
                            }
                            {
                                error ? error  : null
                            }

                                                                              
                        </Paper>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} />
                    
                    <div id="map" style= {{width: 100 + 'px', height:100+'px', display: 'none'}} ></div>
                                  
                </Grid>      
            </CardContent>
            <Footer/>
        </>
    );
};

 export default View;