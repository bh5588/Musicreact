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
                  <button  onClick={() => history.goBack()} className='Close_Button_Music' >X</button>
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
                            <input type='text'  name="songname"   required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <input type='text'  name="songdescription"  required />
                            <label className='Music_Upolad_L' >Song description</label>
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Song Perview</p>
                            <div className='Small_Note_Perview'>
                                <small className='Music_Note_Up' >The song should be greater than10 seconds, but  <span className='Br_Line_up'><br></br></span>less than 15 seconds.</small>
                            </div>
                            <input type='file' title='preview file' placeholder='Preview File' name="songpreview" required />
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Orginal Song</p>
                            <div className='Small_Note_Perview'>
                                <small className='Music_Note_Up' >Upload here Orginal song here</small>
                            </div>
                            <input type='file' title='preview file' placeholder='Preview File' name="songpreview" required />
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P'>Song Licence</p>
                            <select className='Song_Type' name='songtype' required defaultValue='0' >
                                  <option value='0' disabled selected >Please choose an option</option>
                                  <option value='Standard'>Standard</option>
                                  <option value='professional'>professional</option>
                                  <option value='exclusive'>exclusive</option>
                            </select>
                          </div>
                           <div className='Submit_Btn_Music'>
                              <button className='Music_Upload_Data'>Upload</button>
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