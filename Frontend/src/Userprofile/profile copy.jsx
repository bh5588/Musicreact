import React,{useEffect,useState} from 'react'
import './profile.css'
import { Link, useHistory } from 'react-router-dom';
import Home from '../Components/Home'

const profile = () => {
  const toggleDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const element = document.body;
    element.classList.toggle('dark-side');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const element = document.body;

    if (isDarkMode) {
      element.classList.add('dark-side');
    }
  }, []);

    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  return (
    <>
    <div className='User_profile_id'>
      <div className='Dark_btn'>
         <button onClick={toggleDarkMode}  className="BUTNS Button_BTN  Byu" title="Change To Dark Mode"></button>
      </div>
       <div className='User_profile_M'>
         <div className='User_Profile_List'>
             <form  >
                 <div className='Upload_Img'>
                 <label htmlFor="fileInput" className="fileInputLabel">
                 {selectedImage ? (
                    <img src={selectedImage} alt="Selected" style={{ display: 'block', maxWidth: '100px', maxHeight: '100px' }} />
                  ) : (
                    <span>null</span>
                  )}
                    <div className='Upload_Btn_image'>
                      <input type="file" id="fileInput" className="fileInput" onChange={handleImageChange} />
                    </div>
                  </label>
      
                 </div>
             </form>
         </div>
       </div>
       <Link to="/Home">Home</Link>
    </div>
   
    </>
  )
}

export default profile