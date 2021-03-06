import React from 'react'

const Video = (props) => {
    let url = props.url;
    let result = url.includes(".mp4");
    let urlRaplace = url.replace("watch?v=","embed/");
  return <>
   
    {
      result ? <video width="320" height="240" controls autoplay>
      <source src={url} type="video/mp4"/>
      Your browser does not support the video tag.
      </video>  :
      <iframe id="player"  width="95%" height="100%"
          src={urlRaplace+'?autoplay=1'}
          title="YouTube video player" allow='autoplay' allowFullScreen>
      </iframe>
    }
    
    </>
}

export default Video