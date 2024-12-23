import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Enter.css";
import backgroundVideo from "../../images/intro.mp4"; 
import mosqueimg from '../../images/mosque.png'

const Entry = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      video.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    };

    playVideo();

    window.addEventListener('click', playVideo);

    return () => {
      window.removeEventListener('click', playVideo);
    };
  }, []);

  return (
    <div className="background">
      <video ref={videoRef} src={backgroundVideo} type="video/mp4" autoPlay loop   playsInline className="background-video" />
      <div className="text-overlay">
        <h1 className="brand-img">AR-Rahman</h1>
        <p className="subhead">நம்பிக்கை கொண்டோர் மீது தொழுகை நேரம் குறிப்பிட்ட கடமையாகவுள்ளது</p>
        <nav className="main-links" id="main-link">
          <Link to="/listmosque" className="link-main">
            <h1 id="link"className="link-item">find mosque <img className="introimg" src={mosqueimg} alt="" /></h1>
          </Link>
       
        </nav>
      </div>
    </div>
  );
};

export default Entry;
