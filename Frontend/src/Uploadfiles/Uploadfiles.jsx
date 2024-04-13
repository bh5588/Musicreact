import React,{useState,useEffect} from 'react'
import  axios  from 'axios';
import './uploadfiles.css'

const Uploadfiles = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
 // const history = useHistory();

 useEffect(() => {
  const fetchNavbarData = () => {
    axios.get('/navbar')
      .then(response => {
        const { isLoggedIn, user } = response.data;
        setIsLoggedIn(isLoggedIn);
        setUser(user);
      })
      .catch(error => console.error('Error fetching navbar data:', error));
  };

  fetchNavbarData(); 

  const intervalId = setInterval(fetchNavbarData, 2500); // Example: fetch every 60 seconds

  return () => clearInterval(intervalId);
}, []);


const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs associated with the logged-in user
    const fetchSongs = async () => {
      try {
        const response = await axios.get('/songsfiles');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []); 


  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  const handlePlayButtonClick = (index) => {
      setCurrentSongIndex(index);
      const audioElement = document.querySelector(`#audio_${index}`);
      if (audioElement) {
          audioElement.play();
      }
  };

  return (
    <>
       {isLoggedIn ?(<> <title>Upload Files | Music Explore </title>
        <div className='Upload_User_Files'>
            <div className='Upload_Container_files'>
                <div className='Upload_Title_Files'>
                    <div className='Upload_Text_Files'>
                          <div className='SongFiles'>
                               <div  className='SongFiles_Details'>
                                   <div className='Songs_Details_Grid'>

                                   {songs.map((song,index) => (
                                        <div  className='Details_Songs_Files' key={song.id}>
                                            <div className='Name_Songs_Details'>
                                               <div className='Name_Image_Details'>
                                                  <div className='Image_Pic'>
                                                        {song.songimage ? (
                                                            <img className='Image_Song_details' src={`song/images/${song.songimage}`} alt="Song Image" />
                                                        ) : (
                                                            <div className="No_image">
                                                                 <div className='Linear_G'>
                                                                      <div className='Middle_Name'>
                                                                            <div className='Name_Center'>
                                                                            {song.songname}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='Song_rem_Details'>
                                                    <div key={index} className='Audio_Button'>
                                                        <audio id={`audio_${index}`} className='Song_Audio_preview_Music' controls controlsList="nodownload">
                                                            <source src={`song/preview/${song.songpreview}`} />
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                        <button className='BTN_Play' onClick={() => handlePlayButtonClick(index)}><i className="fa fa-play" aria-hidden="true"></i></button>
                                                    </div>

                                                       <div className='Song_Name_De'>
                                                           <p className='Song_Name_S'>{song.songname}</p>
                                                           <p className='Song_Des'>{song.songdescription}</p>
                                                        </div>
                                                    </div>
                                               </div>




                                              </div>
                        



                                    
                                        </div>

                                      
                                      ))}

                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        <img src='https://i.stack.imgur.com/jDGzD.png'/>
        
       </>):(<></>)}
    </>
  )
}

export default Uploadfiles