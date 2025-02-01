import { useState, useRef, useEffect } from 'react';
import './App.css';
import { Cursor } from 'react-simple-typewriter';
import bgImage from './assets/IMG_9724.jpg'
import MyAudio from './assets/audio.mp3'

function App() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [buttonText,setButtonText] = useState("TAP HERE BBG");
  const timeoutRef = useRef(null);
  const [isTypingComplete,setIsTypingComplete] = useState(false);
  const fullText="Hey,Ana thank you for waiting all this moment for the gifts.I wanted to let you know that I am very grateful for the fact that I got the love of a person so beautiful and astonoshing like you.Everytime I see you run towards me I kinda fall in a new dimension where every flower and natural elements smell like you.I have never ever had a feeling like this making me question myself,maybe this is called love.You are a part of my life,a daily necessity for my heart to keeping pumping blood throughout my body.You are my healer.I love you Ana BBG";

  const audioRef = useRef(null);
  const [drinkWater,setDrinkWater] = useState(false)
  
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
      setDrinkWater(false);
    }else{
      setButtonText("STOP")
      setIsTypingComplete(false);
      setDrinkWater(false);
    }
  }

  const handleRevealText =()=>{
    setIsTypingComplete(false);
    setDrinkWater(true);
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
              <p className="p-4 text-center text-shadow-black-main text-white justify-center playwrite-in-main-text">
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
            onClick={handleRevealText}>
              <p className='pacifico-regular text-sm'>
                SECRET TEXT
              </p>
            </button>
            )}

            <div className='revealText pacifico-regular'>
              {drinkWater && (<div className="keyboard">
                <span className="key">D</span>
                <span className="key">R</span>
                <span className="key">I</span>
                <span className="key">N</span>
                <span className="key">K</span>
                <span className="key">&nbsp;</span> 
                <span className="key">W</span>
                <span className="key">A</span>
                <span className="key">T</span>
                <span className="key">E</span>
                <span className="key">R</span>
                <span className="key">&nbsp;</span>
                <span class="key hh">&hearts;</span>

              </div>)}
            </div>

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
