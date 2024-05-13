import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import cornerImage from './images/Ninjas in Costumes.png';
import ninjaImage from './images/ninja.png';
import './loader.css'
import { transition } from './loader.js'
import {fetchNinjaByWristband} from './services/gateway.js'

const Home = () => {
  const [transitionDone, setTransitionDone] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const inputRef = useRef(null);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [ninjaStars, setNinjaStars] = useState(0);
  const [ninjaName, setNinjaName] = useState('');

  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element is not the input or inside the input
      if (!inputRef.current.contains(event.target)) {
        // If so, refocus on the input
        inputRef.current.focus();
      }
    };
  
    // Automatically focus on the text box when the component mounts
    inputRef.current.focus();
  
    // Add click event listener to the document
    document.addEventListener('click', handleClick);
  
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  

  const handleKeyPress = (event) => {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      setTextBoxValue(inputRef.current.value)
      handleTransition()
    }
  };

  useEffect(() => {
    if (transitionDone && welcomeDone){
      fetchNinjaByWristband(textBoxValue)
      .then ((data) => {
        if (data != null){
          setNinjaStars(data[0].NumStars)
          setNinjaName(data[0].FName)
        }
        else{
          setNinjaStars("n/a")
          setNinjaName("n/a")
        }
      })
    }
  })

  const handleTransition = () => {
    // Reset states before starting the transition
    setTransitionDone(false);
    setWelcomeDone(false);

    // Clear our invisible textbox
    inputRef.current.value = "";

    // Start the transition after a short delay
    setTimeout(() => {
      setTransitionDone(true);
      transition();
    }, 100);

    // Set welcomeDone to true after the first animation completes
    setTimeout(() => {
      setWelcomeDone(true);
    }, 2200);

    // Reset states and text after the second animation completes
    setTimeout(() => {
      setTransitionDone(false);
      transition();
    }, 8000); 
  };
  

  return (
    <div className="home-container">
      {/* Overlay elements for animation */}
      <div className="overlay top"></div>
      <div className="overlay bottom"></div>

      {/* Loader animation */}
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>

      {/* Invisible text box */}
      <input
        ref={inputRef}
        type="text"
        className="invisible-text-box"
        onKeyDown={handleKeyPress}
      />

      <h1 className={`custom-font center-text`} key={transitionDone ? 'congratulations' : 'welcome'}>
        {!transitionDone ? (
          <div className="waviy">
            <span style={{ '--i': 1 }}>W</span>
            <span style={{ '--i': 2 }}>e</span>
            <span style={{ '--i': 3 }}>l</span>
            <span style={{ '--i': 4 }}>c</span>
            <span style={{ '--i': 5 }}>o</span>
            <span style={{ '--i': 6 }}>m</span>
            <span style={{ '--i': 7 }}>e</span>
            <span style={{ '--i': 8 }}>&nbsp;</span>
            <span style={{ '--i': 9 }}>N</span>
            <span style={{ '--i': 10 }}>i</span>
            <span style={{ '--i': 11 }}>n</span>
            <span style={{ '--i': 12 }}>j</span>
            <span style={{ '--i': 13 }}>a</span>
            <span style={{ '--i': 14 }}>s</span>
            <span style={{ '--i': 15 }}>!</span>
            <br />
            <br />
            <span style={{ '--i': 16 }}>P</span>
            <span style={{ '--i': 17 }}>l</span>
            <span style={{ '--i': 18 }}>e</span>
            <span style={{ '--i': 19 }}>a</span>
            <span style={{ '--i': 20 }}>s</span>
            <span style={{ '--i': 21 }}>e</span>
            <span style={{ '--i': 22 }}>&nbsp;</span>
            <span style={{ '--i': 23 }}>s</span>
            <span style={{ '--i': 24 }}>c</span>
            <span style={{ '--i': 25 }}>a</span>
            <span style={{ '--i': 26 }}>n</span>
            <span style={{ '--i': 27 }}>&nbsp;</span>
            <span style={{ '--i': 28 }}>y</span>
            <span style={{ '--i': 29 }}>o</span>
            <span style={{ '--i': 30 }}>u</span>
            <span style={{ '--i': 31 }}>r</span>
            <span style={{ '--i': 32 }}>&nbsp;</span>
            <span style={{ '--i': 33 }}>w</span>
            <span style={{ '--i': 34 }}>r</span>
            <span style={{ '--i': 35 }}>i</span>
            <span style={{ '--i': 36 }}>s</span>
            <span style={{ '--i': 37 }}>t</span>
            <span style={{ '--i': 38 }}>&nbsp;</span>
            <span style={{ '--i': 39 }}>b</span>
            <span style={{ '--i': 40 }}>a</span>
            <span style={{ '--i': 41 }}>n</span>
            <span style={{ '--i': 42 }}>d</span>
            <span style={{ '--i': 43 }}>s</span>
            <br />

            <span style={{ '--i': 44 }}>t</span>
            <span style={{ '--i': 45 }}>o</span>
            <span style={{ '--i': 46 }}>&nbsp;</span>
            <span style={{ '--i': 47 }}>s</span>
            <span style={{ '--i': 48 }}>e</span>
            <span style={{ '--i': 49 }}>e</span>
            <span style={{ '--i': 50 }}>&nbsp;</span>
            <span style={{ '--i': 51 }}>y</span>
            <span style={{ '--i': 52 }}>o</span>
            <span style={{ '--i': 53 }}>u</span>
            <span style={{ '--i': 54 }}>r</span>
            <span style={{ '--i': 55 }}>&nbsp;</span>
            <span style={{ '--i': 56 }}>s</span>
            <span style={{ '--i': 57 }}>t</span>
            <span style={{ '--i': 58 }}>a</span>
            <span style={{ '--i': 59 }}>r</span>
            <span style={{ '--i': 60 }}>s</span>
          </div>
        ) : (
          welcomeDone ? (
            <div className="waviy">
              <span style={{ '--i': 1 }}>C</span>
              <span style={{ '--i': 2 }}>o</span>
              <span style={{ '--i': 3 }}>n</span>
              <span style={{ '--i': 4 }}>g</span>
              <span style={{ '--i': 5 }}>r</span>
              <span style={{ '--i': 6 }}>a</span>
              <span style={{ '--i': 7 }}>t</span>
              <span style={{ '--i': 8 }}>u</span>
              <span style={{ '--i': 9 }}>l</span>
              <span style={{ '--i': 10 }}>a</span>
              <span style={{ '--i': 11 }}>t</span>
              <span style={{ '--i': 12 }}>i</span>
              <span style={{ '--i': 13 }}>o</span>
              <span style={{ '--i': 14 }}>n</span>
              <span style={{ '--i': 15 }}>s</span>
              <span style={{ '--i': 16 }}>!</span>
              <span style={{ '--i': 17 }}>&nbsp;</span>
              <span style={{ '--i': 17 }}>{ninjaName}</span>
              <br></br>
              <span style={{ '--i': 18 }}>Y</span>
              <span style={{ '--i': 19 }}>o</span>
              <span style={{ '--i': 20 }}>u</span>
              <span style={{ '--i': 21 }}>&nbsp;</span>
              <span style={{ '--i': 22 }}>H</span>
              <span style={{ '--i': 23 }}>a</span>
              <span style={{ '--i': 24 }}>v</span>
              <span style={{ '--i': 25 }}>e</span>
              <span style={{ '--i': 26 }}>&nbsp;</span>
              <span style={{ '--i': 27 }}>E</span>
              <span style={{ '--i': 28 }}>a</span>
              <span style={{ '--i': 29 }}>r</span>
              <span style={{ '--i': 30 }}>n</span>
              <span style={{ '--i': 31 }}>e</span>
              <span style={{ '--i': 32 }}>d</span>
              <br />
              <span style={{ '--i': 33 }}>{ninjaStars}</span>
              <br />
              <span style={{ '--i': 34 }}>A</span>
              <span style={{ '--i': 35 }}>m</span>
              <span style={{ '--i': 36 }}>o</span>
              <span style={{ '--i': 37 }}>u</span>
              <span style={{ '--i': 38 }}>n</span>
              <span style={{ '--i': 39 }}>t</span>
              <span style={{ '--i': 40 }}>&nbsp;</span>
              <span style={{ '--i': 41 }}>o</span>
              <span style={{ '--i': 42 }}>f</span>
              <span style={{ '--i': 43 }}>&nbsp;</span>
              <span style={{ '--i': 44 }}>S</span>
              <span style={{ '--i': 45 }}>t</span>
              <span style={{ '--i': 46 }}>a</span>
              <span style={{ '--i': 47 }}>r</span>
              <span style={{ '--i': 48 }}>s</span>
            </div>
          ) : null 
          )}
      </h1>
      {/* <button className="btn" onClick={handleTransition}>Begin Transition</button> */}
      <img src={cornerImage} alt=';' className="bottom-right-image" />
      <img src={ninjaImage} alt=';' className="ninja-image" />
    </div>

  );
};

export default Home;