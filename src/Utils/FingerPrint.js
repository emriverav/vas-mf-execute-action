import { ClientJS } from 'clientjs';

export const getBrowserId = () =>{
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
    if(client.isMobileAndroid()){
        browserId = "07";
    }
    if(client.isMobileIOS()){
        browserId = "08";
    }
    
    return browserId;
};

export const getDevice = () =>{
    var client = new ClientJS();
    var deviceId = "";
    var isMobileAndroid = client.isMobileAndroid(); 
    var isMobileIOS = client.isMobileIOS(); // Check For Mobile iOS

    if(isMobileAndroid){
        deviceId="Android"
    }
    if(isMobileIOS){

        var isIphone = client.isIphone(); // Check For iPhone
        var isIpad = client.isIpad(); // Check For iPad
        var isIpod = client.isIpod(); // Check For iPod

        if(isIphone){
            deviceId ="IOS "+ "iPhone";
        }
        if(isIpad){
            deviceId ="IOS "+ "iPad";
        }
        if(isIpod){
            deviceId ="IOS "+ "iPod";
        }
    }
 
    return deviceId;
}