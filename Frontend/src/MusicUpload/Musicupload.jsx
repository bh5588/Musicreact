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
       
           <div className='Music_Title'>
            <div className='Close_Btn_music'>
                  <button  onClick={() => history.goBack()} className='Close_Button_Music' ><i id="Music_Times-Fa" className="fa fa-times" aria-hidden="true"></i>  </button>
               </div>
           <form method='post' className='Form_Music_Up' >
              <div className='H_Music'>
                  <h1 className='Music_Name_Upload_q'>
                     Music Upload
                  </h1>
              </div>
              <div className='Container_Music'>
                 <div className='Content_Music'>
                     <div className='Inputs_Music_grid'>
                         <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songname" id='name'  required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                     </div>
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