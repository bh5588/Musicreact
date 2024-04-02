import React from 'react'
import { useHistory } from "react-router-dom";
import './Musicupload.css'

const Musicupload = () => {
   let history = useHistory();
  
  return (
    <>
     <div className='Music_Upload'>
    
    <title>Music Upload</title>
        <div className='Music_values'>
        <button onClick={() => history.goBack()} className='Close_Button' >Close</button>
           <div className='Music_Title'>
           
           <form method='post' className='Form_Music_Up' >
              <div className='H_Music'>
                  <h1 className='Music_Name_Upload_q'>
                     Music Upload
                  </h1>
              </div>
              <div className='Container_Music'>
                 <div className='Content_Music'>
                    
                 </div>
              </div>
                

           </form>

           </div>
        </div>
     </div>
        
     </>
  )
}

export default Musicupload