import React from 'react'

const Video = (props) => {
    let url = props.url;
    let urlRaplace = url.replace("watch?v=","embed/");
  return <>
   
    <iframe id="player"  width="95%" height="100%"
        src={urlRaplace}
        title="YouTube video player" allowFullScreen>
    </iframe>

    </>
}

export default Video