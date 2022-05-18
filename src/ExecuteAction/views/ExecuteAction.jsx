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
 import useStyles from './styles/Action.style';
 import { 
    Grid, 
    Typography,
    CardContent,
    Paper,
    Divider,
    Link
} from '@mui/material';
import { useSearchParams  } from 'react-router-dom';
import Video from '../../Video/Video';
import Imagen from '../../Imagen/Imagen';
import { Form } from '../../Form/Form';
import { ClientJS } from 'clientjs';
import { getBrowserId,getDevice } from "../../Utils/FingerPrint";
import CircularProgress from '@mui/material/CircularProgress';


 const View = (props) => {
    const [searchParams] = useSearchParams();
    var idQr = searchParams.get('idQr');
    const [resp, setResp]  = useState([]);
    const [respCode, setRespCode]  = useState([]);
    
    const [error, setError] = useState("");
    const [address, setAddress]= useState("");
    const [loader, setLoader]=useState(true);
    const [geolocation,setGeolocation] =useState([]);
    const [geolocationUser, setGeolocationUser] = useState(false);
    
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

    const { mt3, paperContainer, title ,cenLoader,center } = useStyles();  

    useEffect(() => {
  
        const   fetchMyAPI = async () =>  {
          //let url = "http://localhost:8089/qrs/4619bc5b-4139-405a-83fb-df6fb1b302ba"
        
          try {
            let url = `${process.env.APIURL}${idQr}` 
            const response = await fetch(url);
    
            if (response.status == 200) {
                const data = await response.json();
                setLoader(false)          
                if(data.qr){
                  setResp(data.qr)
                }
                if(data.response){
                  setRespCode(data.response)
                }
                if(data.response.code==1000){
                  setError("QR no está activo")
                  setLoader(false) 
                }
                if(data.response.code==1001){
                  setError("QR aun no está vigente")
                  setLoader(false) 
                }
                if(data.response.code==1002){
                  setError("QR Vigencia Expirada")
                  setLoader(false) 
                }
               
               
              } else {
                throw  new Error(response.status);
              }
         
          } catch(err) {
            // atrapa errores tanto en fetch como en response.json
            console.log("Error Peticion ", err );
            setError(err)
            setLoader(false) 
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
              setGeolocationUser(false)
              console.log(`ERROR(${err.code}): ${err.message}`)
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
               setGeolocationUser(false)
               console.log('Geocode was not successful for the following reason: ' + status);
             }
           });
         }
         
        }else {
          setGeolocationUser(false)
        }

      },[])

      //var arr = []
        var obj ={
          "description": resp.action ? resp.action == '001' ? "Action Form" : (resp.action == '002' ? "Action view Video" : "Action Site" ) : error ,
          "address": address ? address : "",
          "addressState": address ? address.split(",").reverse()[1].replace(/ /g, "") : null,
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
          "catDescription": resp.catDescription ? resp.catDescription : null,
          "startDate": new  Date(Date.now()).toISOString()
        }

      
      React.useMemo(()=>{
       var active = geolocationUser;
             //Se valida if User permite ubicación        
              if(active){
                  if(obj.address.length>0  ){
                    addMetrics(obj)
                  }   
               
                if(!active ){
                  return
                }
            }
            //Cuando user no permite ubicación
            else{
             
             if(active){
              addMetrics(obj)
             }
             if(!active && obj.description.length>0){
              addMetrics(obj)
             }
                      
            }
      },[obj.address,obj.description])
      
     
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
                            {resp.catDescription ? resp.catDescription : null}
                        </Typography>
                    </Grid>
                    {loader ? <CircularProgress  disableShrink className={cenLoader} /> : <Grid item xs={12} sm={6} lg={4} className={mt3}>
                        <Paper className={paperContainer}>
                            <Typography variant='subtitle1' className={title}>
                              Sub-categoría : {  resp.subcategory ? resp.subcategory.split("|")[1] : null }
                            </Typography>
                            <Divider />
                         
                            {
                              respCode.code == "200" ? (resp.action == '003' ?  <Imagen url={`${resp.image}`} href={`${resp.value}`}/> : ( resp.action == '002' ? <Video url={`${resp.value}`}/> : <Form val = {`${resp.value}`} idQr ={`${resp.idQr}`}  idCat ={`${resp.idCat}`} SubCat = {`${resp.subcategory}`} idForm={`${resp.idForm}`} />)) : error
                            }
                                                                             
                        </Paper>
                        
                    </Grid> 
                    }
                    <Grid item xs={12} sm={3} lg={4} />
                    
                    <div id="map" style= {{width: 100 + 'px', height:100+'px', display: 'none'}} ></div>
                          
                </Grid>      
            </CardContent> 
              <Grid item xs={12} sm={3} lg={4} className={center}>
                    <Link  href="https://assetspwa.liverpool.com.mx/ayuda/index.html#/sec/terminos-y-condiciones/proteccion-de-datos/aviso-clientes" target='_Blank' >Política de privacidad</Link>
              </Grid>   
            <Footer/>
        </>
    );
};

 export default View;