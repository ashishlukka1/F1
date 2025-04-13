import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function F1StreamFullScreen() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set a timeout to hide the loading indicator after a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Handle fullscreen mode
    const handleFullScreen = () => {
      const element = document.documentElement;
      
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };
    
    // Attempt to go fullscreen after a brief delay
    const fullscreenTimer = setTimeout(() => {
      handleFullScreen();
    }, 500);
    
    // Clean up timers on unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(fullscreenTimer);
    };
  }, []);

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  
  return (
    <div className="position-relative bg-dark vh-100 overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center bg-dark" style={{ zIndex: 10 }}>
          <div className="text-center">
            <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-white fs-4">Loading F1 Stream...</p>
          </div>
        </div>
      )}
      
      {/* Streaming iframe */}
      <iframe 
        src="https://flstv.online//embed/f1.php" 
        className="position-absolute top-0 start-0 w-100 h-100 border-0"
        allowFullScreen={true}
        title="F1 Live Stream"
      />
      
      {/* Fullscreen button */}
      <div className="position-absolute bottom-0 end-0 m-3" style={{ zIndex: 20 }}>
        <button 
          onClick={handleFullScreen}
          className="btn btn-danger shadow"
        >
          Enter Fullscreen
        </button>
      </div>
    </div>
  );
}