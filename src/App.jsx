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
  const fullText="Hey,Ana thank you for waiting all this moment for the gifts.I wnated to let you know that I am very grateful for the fact that I got the love of a person so beautiful and astonoshing like you,I mean its funny how an average guy like me can be loved like the way you do.I bet you can understand what kind of person I am,filled with trust issues,and you act accordingly handeling my sensitive mind.I deeply appreciate your patience and things you do for me.Never though I would love someone so much,I though I cannot be loved because of the way I am.I made this website for you it may not be like the professionals but the truth is every line of code consits of my love and trust.Ill make more fun softwares in the future but for now I just wanted give you a small taste of how I can appreciate you in funny ways.But as I said this website is not that impressive in comaprison to the softwares I made,I wanted to try out a new love language I hope you will like it and as always I Love You Ana My life wont have any reason without you,and I cannot imagine a world without your presence in it."
  const audioRef = useRef(null);
  const [sendMessegeTextDisplay,setSendMessageTextDisplay] = useState('');
  const [checkResponse,setCheckResponse]=useState("");
  const [showButton,setShowButton] = useState(true);
  
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
      setShowButton(false);

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
            {isTypingComplete && showButton && (
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
