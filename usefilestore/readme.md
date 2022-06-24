import React, { useState, useEffect } from 'react';
import useFileStore from './hooks/useFileStore';
import axios from 'axios';
import './assets/css/app.css';

const App = () => {

  const [image, setImage] = useState([]) // UPDATE IMAGE FROM INPUT
  const [fileupdate, setFileupdate] = useState(''); // UPDATE API URL WHEN SUCCESS
  const [dynobtn, setDynobtn] = useState('SUBMIT'); // UPDATE BUTTON TEXT
  const [btnbool, setBtnbool] = useState(false); // BUTTON DIESABLE AFTER UPLOADED IMAGE

  const store = useFileStore(image, 'vkwjynx7', 'ddf7je8jj') // HOOK THAT CONTAIN CONFIGRATION

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDynobtn('UPLOADING...');
    const FORMDATA = store.FORM_DATA; // NEED TO USE THE STORE.FORM_DATA
      try{
        const response = await axios.post(store.CLOUD_URL, FORMDATA); // USE CLOUD_URL AND FORM_DATA
        setFileupdate(response.data.secure_url);
      }catch(err){
        console.log(err);
        setDynobtn('ERROR!');
      }
    }
    useEffect(()=>{
      if(fileupdate.length !== 0){
        setDynobtn('UPLOADED!');
        console.log(fileupdate)
        setBtnbool(true)
      }
    },[fileupdate])
    
  return (
    <>
        <div className='container-app'>
          <div className='column'>
            <form onSubmit={handleSubmit}>
              <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} required/>
              <button disabled={btnbool}>{dynobtn}</button>
            </form>
            {
              fileupdate.length !== 0 && <a href={fileupdate} target="_blank" rel="noreferrer">IMAGE UPLOADED CHECK HERE!</a>
            }
          </div>
        </div>
    </>
  )
}

export default App