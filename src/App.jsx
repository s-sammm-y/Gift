import { useState, useRef, useEffect } from 'react';
import './App.css';
import { Cursor } from 'react-simple-typewriter';
import bgImage from './assets/IMG_9724.jpg'
import MyAudio from './assets/audio.mp3'
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [buttonText,setButtonText] = useState("TAP HERE BBG");
  const timeoutRef = useRef(null);
  const [isTypingComplete,setIsTypingComplete] = useState(false);
  const fullText =
      'heloowasb hdbiuadhsabdhbsad isabdiasdsa.';

  const audioRef = useRef(null);
  const [sendMessegeTextDisplay,setSendMessageTextDisplay] = useState('');
  const [checkResponse,setCheckResponse]=useState("");
  
    const typewriter = (textToType, i = 0) => {
    if (i < textToType.length) {
      setText((prev) => prev + textToType[i]);
      timeoutRef.current = setTimeout(() => typewriter(textToType, i + 1), 150);
    }else{
      setIsTypingComplete(true);
    }
  };


  const playAudio = ()=>{
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  const pauseAudio=()=>{
    audioRef.current.pause();
  }
  
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  };


  const startTyping = () => {
    if (isTyping) {
      clearTimeout(timeoutRef.current);
      setIsTyping(false);
      setText('');
      changeButtonName(true);
      pauseAudio();
    } else {
      setIsTyping(true);
      setText('');
      typewriter(fullText);
      changeButtonName(false)
      playAudio();
    }
  };


  const changeButtonName = (check) =>{
    if(check){
      setButtonText("REPLAY");
      setIsTypingComplete(false);
      setSendMessageTextDisplay('');
    }else{
      setButtonText("STOP")
      setIsTypingComplete(false);
      setSendMessageTextDisplay('');
    }
  }

  const handleSendMessage = async ()=>{
    try{
      const response = await axios.post("http://localhost:5000/send-message")
      console.log(response.data.message);
      setCheckResponse('')
      setSendMessageTextDisplay('Check your phone Message Inbox babygirl');
      setIsTypingComplete(false);
    }catch(err){
      console.error('Error making post request',err);
      setCheckResponse('Something is wrong tell your Boyfriend to fix me');
    }
  }

  return (
    <>
      <div style={backgroundStyle}>
        <div className="grid grid-col-1 sm:grid-col-2 place-items-center p-6">
        <button 
        type="button" 
        className="heart pacifico-regular "
        onClick={startTyping}>

          {buttonText}

        </button>

          <section className="pt-6">
            <div className="bg-black/50 rounded-md">
              <p className="p-4 text-center text-white justify-center">
                {text}
                <span>
                <Cursor/>
                </span>
              </p>
            </div>
          </section>

          <div className='Ending'>
            {isTypingComplete && (
            <button className='pacifico-regular pt-5 text-center justify-center h-20 w-20 bg-opacity-0' 
            onClick={handleSendMessage}>
              SECRECT TEXT CLICK HERE
            </button>
            )}

            <p className='pacifico-regular pt-5'>
              {sendMessegeTextDisplay}
              {checkResponse}
            </p>
          </div>

          </div >

        <audio ref={audioRef}>
          <source  src={MyAudio} type='audio/mpeg'/>
        </audio>
      </div>
    </>
  );
}

export default App;
