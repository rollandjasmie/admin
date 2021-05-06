import React, { useState } from 'react';

import { Global, css, jsx } from '@emotion/core';
import ThumbnailGallery from './ThumbnailGallery';

import ActiveThumbnailWindow from './ActiveThumbnailWindow';


/**
 *
  ity ilay APP izy rehetra , ato daoly no antsona 
 */
const OrdrePhoto= () => (
  <>
  
  <div style={ThumbnailGalleryStyles}>

     <div style={{ flex: 1 }}>
      <ActiveThumbnailWindow/>

     </div>


     <div style={{ flex: 1}}>
 
      ato no misy soratra
     </div>

   </div>


  </>
)



const ThumbnailGalleryStyles ={
  display:'flex',
  background:'#ddd',
  height:'500px',
  width:'1000px',
  margin: '40px auto',
}



export default OrdrePhoto;