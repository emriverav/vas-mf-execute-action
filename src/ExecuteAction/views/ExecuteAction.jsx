/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [22/03/2022]
 * @updated:
 * @description: Vista del componente Login.
 **/

 import React,{useEffect, useMemo, useState} from 'react';
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

    const [error, setError] = useState([]);
    const [address, setAddress]= useState("");
    const [errorGeolocation, setErrorGeo]=useState("");
    const [geolocation,setGeolocation] =useState([]);
    const [geolocationUser, setGeolocationUser] = useState(false)
    
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

                if(data.qr){
                  setResp(data.qr)
                }else{
                  setError("No hay Datos para Mostrar")
                }
                if(data.response.code==1000){
                  setError("QR no está activo")
                }
                if(data.response.code==1001){
                  setError("QR aun no está vigente")
                }
                if(data.response.code==1002){
                  setError("QR Vigencia Expirada")
                }
               
               
              } else {
                throw  new Error(response.status);
              }
         
          } catch(err) {
            // atrapa errores tanto en fetch como en response.json
            console.log("Error Peticion ", err );
            setError(err)
          }
        
        }

        if(idQr){
            fetchMyAPI()
            
        }
        else{
            setError("No hay IDQR")
        }
        if (navigator.geolocation) {
          setGeolocationUser(true)
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
              setGeolocation([crd.latitude, crd.longitude])
              //console.log(`More or less ${crd.accuracy} meters.`);
            }
            
            function errorGeo(err) {
              setErrorGeo(`ERROR(${err.code}): ${err.message}`)
            }
            
          navigator.geolocation.getCurrentPosition(success, errorGeo, options);
       
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
         
        }else {
          setGeolocationUser(false)
        }

      },[])

      //var arr = []
        var obj ={
          "description": resp.action ? resp.action == '001' ? "Action Form" : (resp.action == '002' ? "Action view Video" : "Action Site" ) : null ,
          "address": address ? address : "",
          "addressState": address ? address.split(",").reverse()[1] : null,
          "addressZipCode": address ? (address.length>2 ?  address.split(",").reverse()[2].split(" ")[1] : null ):null,
          "creationDate": new  Date(Date.now()).toISOString(),
          "fingerPrint": finger? finger: finger,
          "idAction": resp.action ? resp.action : null,
          "idCat": resp.idCat ?  resp.idCat: null,
          "idForm": resp.idForm ? resp.idForm : null,
          "idQr": idQr ? idQr : null,
          "latitude": geolocation ? geolocation[0] :"",
          "longitude": geolocation ? geolocation[1] :"",
          "subcategory": resp.subcategory ? resp.subcategory : null ,
          "typeDevice":  device ? device : null,
          "startDate": new  Date(Date.now()).toISOString()
        }

      
      React.useMemo(()=>{
       var active = geolocationUser;
      
       navigator.permissions.query({name:'geolocation'})
        .then(function(permissionStatus) {   
            if(permissionStatus.state == 'granted') {             
              
              if(active){
                if(obj.address.length>0  ){
                  addMetrics(obj)
                }   
              }  

              if(!active && permissionStatus.state == 'granted' ){
                return
              }
 
            }else{
              if(!active && permissionStatus.state !== 'granted'){
                addMetrics(obj)
              }
            }
        });
            
      },[obj.address])
      
     
     
     async function addMetrics(obj) {
   
       const optionsPost = { 
         method: 'POST', 
         body: JSON.stringify(obj),
         headers: {
               'Content-Type': 'application/json'
             }    
       };

       try {
         let response = await fetch(`${process.env.APIURLMETRICS}`, optionsPost);
         let insertResp = await response.json();
         console.log(insertResp)
       } catch(err) {
         // atrapa errores tanto en fetch como en response.json
         console.log(err);
       }
     }


  
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
                                Categoría : {  resp.subcategory ? resp.subcategory.split("|")[1] : null }
                            </Typography>
                            <Divider />
                         
                            {
                             resp.length<=0  ? error : (resp.action == '003' ?  <Imagen url={`${resp.image}`} href={`${resp.value}`}/> : ( resp.action == '002' ? <Video url={`${resp.value}`}/> : <Form val = {`${resp.value}`} />))
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