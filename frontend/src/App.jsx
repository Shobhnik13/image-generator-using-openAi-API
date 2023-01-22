import { useState } from 'react'
import './App.css'
import { Configuration, OpenAIApi } from "openai";
function App() {
  const [prompt,setPrompt]=useState('')
  const [image,setImage]=useState('');
  const configuration = new Configuration({
    apiKey:import.meta.env.VITE_Open_AI_Key,
});
const openai = new OpenAIApi(configuration);
const generateImage=async ()=>{
  try{
    const res=await openai.createImage({
    prompt: prompt,
    n:1,
    size:"1024x1024",
  });
  let image_url = res.data.data[0].url;
  setImage(image_url)
}
catch(err){
    console.log(err.message)
  }
}
  return (
    <div className="App-main">
      <h1>Generate an image using OpenAi APi</h1>
      <input type="text" className='app-input' placeholder='Enter a text' onChange={(e)=>setPrompt(e.target.value)} />
      <button className='app-btn' onClick={generateImage}>Generate Image</button>
      {image.length>0 ? <img src={image} alt="" /> :<></>}
         </div>
  )
}

export default App
