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
  const fullText="f."
  const audioRef = useRef(null);
  const [sendMessegeTextDisplay,setSendMessageTextDisplay] = useState('');
  const [checkResponse,setCheckResponse]=useState("");
  
  const typewriter = (textToType, i = 0) => {
    if (i < textToType.length) {
      setText((prev) => prev + textToType[i]);
      timeoutRef.current = setTimeout(() => typewriter(textToType, i + 1), 80);
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
  }


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
      setCheckResponse('');
    }else{
      setButtonText("STOP")
      setIsTypingComplete(false);
      setSendMessageTextDisplay('');
      setCheckResponse('');
    }
  }

  const handleSendMessage = async ()=>{
    try{
      const response = await axios.post("http://localhost:5000/send-message")
      console.log(response.data.message);
      setCheckResponse('')
      setSendMessageTextDisplay('Check your phone Message Inbox babygirl');
      setIsTypingComplete(false)

    }catch(err){
      console.error('Error making post request',err);
      setCheckResponse('Something is wrong tell your Boyfriend to fix me');
      setIsTypingComplete(false);
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
            <div className="rounded-md">
              <p className="p-4 text-center text-sm text-shadow-black-main text-white justify-center playwrite-in-main-text">
                {text}
                <span>
                <Cursor/>
                </span>
              </p>
            </div>
          </section>

          <div className='Ending p-4'>
            {isTypingComplete && (
            <button className='h-15 last' 
            onClick={handleSendMessage}>
              <p className='pacifico-regular text-sm'>
                SECRET TEXT
              </p>
            </button>
            )}

            <p className='pacifico-regular text-white text-shadow-black pt-5'>
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
