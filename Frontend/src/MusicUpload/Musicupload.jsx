import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import './Musicupload.css'
import axios from 'axios';

const Musicupload = () => {
   let history = useHistory();

   const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessageimage, setErrorMessageimage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file.type.split('/')[0] !== 'image') {
            setErrorMessageimage('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
            setErrorMessage('');
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    // preview of the song in 10s to 20s
    const [selectedSong, setSelectedSong] = useState(null);
    const [songDuration, setSongDuration] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSongChange = (event) => {
        const file = event.target.files[0];
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        if (fileSize > 1) {
            setErrorMessage('File size exceeds 1MB.');
            return;
        }

        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
            const duration = Math.round(audio.duration);
            if (duration < 10 || duration > 20) {
                setErrorMessage('Song duration must be between 10 to 20 seconds.');
                return;
            }
            setSongDuration(duration);
            setSelectedSong(file);
            setErrorMessage('');
        };
    };

// Orginal song 

const [selectedFile, setSelectedFile] = useState(null);
    const [previewContent, setPreviewContent] = useState(null);
    const [errorMessageorginal, setErrorMessageOrginal] = useState('');

    const handleOrginalFile = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1024 / 1024; // Convert to MB

        // Check if file size exceeds 50MB
        if (fileSize > 50) {
            setErrorMessage('File size exceeds 50MB.');
            return;
        }

        // Check if the file type is zip or rar
        if (!['application/zip', 'application/x-rar-compressed'].includes(file.type)) {
          setErrorMessageOrginal('Please select a zip or rar file.');
            return;
        }

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewContent(reader.result);
            setErrorMessage('');
        };
        reader.readAsText(file);

        setSelectedFile(file);
    };

    const [musicvalues, setMusicvalues] = useState({
      songid: '',
      songname: '',
      songdescription: '',
      songimage: '',
      songpreview:'',
      songorginal:'',
      songlicence:'',
      songprice:''
    });
    
    const handleMusic = (event) => {
      setMusicvalues({ ...musicvalues, [event.target.name]: event.target.value });
    };
    
    const handlemusicuploadsubmit = (event) => {
      event.preventDefault();
    
      // Generate a random song ID
      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
        let songid = '';
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          songid += characters.charAt(randomIndex);
        }
        
        return songid;
      }
      
      const songid = generateRandomString(21);
     
      // Make a POST request to the server
      axios.post('/songsupload', {
        songid: songid,
        songname: musicvalues.songname,
        songdescription: musicvalues.songdescription,
        songimage: musicvalues.songimage,
        songpreview: musicvalues.songpreview,
        songorginal: musicvalues.songorginal,
        songlicence: musicvalues.songlicence,
        songprice: musicvalues.songprice
      })
      .then((response) => {
        console.log('Server response:', response.data);
        // Handle success response, such as showing a success message or redirecting to another page
      })
      .catch((error) => {
        console.error('Error uploading song:', error);
        // Handle error, such as displaying an error message to the user
      });
    };
    

    
  
  return (
    <>
     <div className='Music_Upload'>
    
    <title>Music Upload</title>
        <div className='Music_values'>
       
           <div className='Music_Title'>
            <div className='Close_Btn_music'>
                  <button  onClick={() => history.goBack()} className='Close_Button_Music' >X</button>
               </div>
           <form method='post' onSubmit={handlemusicuploadsubmit} className='Form_Music_Up' >
              <div className='H_Music'>
                  <h1 className='Music_Name_Upload_q'>
                     Music Upload
                  </h1>
              </div>
              <div className='Container_Music'>
                 <div className='Content_Music'>
                     <div className='Inputs_Music_grid'>
                         <div className='musicupload_Inputs'>
                            <input type='text'  name="songname"  onChange={handleMusic} value={musicvalues.songname}   required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                          <input type='text'  name="songdescription"  onChange={handleMusic} value={musicvalues.songdescription}   required />
                            <label className='Music_Upolad_L' >Song description</label>
                          </div>
                          <div className='musicupload_Inputs'>
                              <p className='Music_Upolad_Perview_P' >Song Image</p>
                                <div className='Small_Note_Perview'>
                                  <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Not required, but if there, please upload.</small></p>
                                </div>

                          {selectedImage ? (
                       <>
                        <div className='center_IMg_upload'>
                          <img src={selectedImage} alt="Selected" className='Img_preview_Music'/>
                        </div>
                       </>
                      ) : (
                        <></>
                      )}
                            <input type='file' title='preview file'  name="songimage"   onChange = { (event) => { handleImageChange(event); handleMusic(event); } }   value={musicvalues.songimage}  accept="image/*" />
                            {errorMessage && <p>{errorMessageimage}</p>}
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Song Perview</p>
                            <div className='Small_Note_Perview'>
                                <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >The song should be greater than10 seconds, but  <span className='Br_Line_up'><br></br></span>less than 20 seconds.</small></p>
                            </div>
                            <div className='Preview_song_View_Upload'>
                            {selectedSong && (
                                       <div>
                                          <audio className='Audio_preview_Music' controls  controlsList="nodownload" >
                                                <source src={URL.createObjectURL(selectedSong)} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                          </audio>
                                       </div>
                                    )}
                                    {errorMessage && <p>{errorMessage}</p>}
                            </div>
                            <input type='file' title='preview file' placeholder='Preview File' name="songpreview"  accept="audio/*"  onChange = { (event) => { handleSongChange(event); handleMusic(event); } } value={musicvalues.songpreview}  />
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Orginal Song</p>
                              <div className='Small_Note_Perview'>
                                  <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Upload here Orginal song here</small></p>
                              </div>
                              {previewContent && (
                                    <div>
                                        <p>Preview Content:</p>
                                        <pre>{previewContent}</pre>
                                    </div>
                                )}
                             <input type='file' title='preview file' placeholder='Preview File' name="songorginal" onChange = { (event) => { handleOrginalFile(event); handleMusic(event); } } value={musicvalues.songorginal} accept=".zip,.rar"  />
                            {errorMessage && <p>{errorMessageorginal}</p>}
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P'>Song Licence</p>
                            <select className='Song_Type' name='songlicence' required defaultValue='0' onChange={handleMusic} value={musicvalues.songlicence}  >
                                  <option value='0' disabled selected >Please choose an option</option>
                                  <option value='Standard'>Standard</option>
                                  <option value='professional'>professional</option>
                                  <option value='exclusive'>exclusive</option>
                            </select>
                          </div>
                          <div className='Price_Song_music'>
                          <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Here, the song price will be calculated in USD(DOLLAR). </small></p>
                              <div className='musicupload_Input' >
                                <input type='number'  name="songprice"  required onChange={handleMusic} value={musicvalues.songprice} />
                                <label className='Music_Upolad_L' >Song Price</label>
                              </div>
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