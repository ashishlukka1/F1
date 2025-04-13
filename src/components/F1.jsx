import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function F1StreamFullScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  
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
    
    // Block popup ads
    const blockPopups = () => {
      if (iframeRef.current) {
        try {
          // This will execute when the iframe is loaded
          iframeRef.current.onload = () => {
            try {
              const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
              
              // Create and inject CSS to hide ads
              const styleEl = iframeDocument.createElement('style');
              styleEl.textContent = `
                /* Hide common ad elements */
                [class*="ad-"], [class*="Ad-"], [class*="advertisement"], [id*="ad-"], [id*="Ad-"],
                [class*="popup"], [id*="popup"], [class*="overlay"], [id*="overlay"],
                iframe:not([src*="f1"]), div[style*="position: fixed"],
                a[target="_blank"], div[class*="modal"], div[id*="modal"] {
                  display: none !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  visibility: hidden !important;
                }
                
                /* Prevent new windows and popups */
                body {
                  overflow: hidden !important;
                }
              `;
              
              // Add the style element to the iframe document
              iframeDocument.head.appendChild(styleEl);
              
              // Observe DOM changes to remove ads dynamically
              const observer = new MutationObserver((mutations) => {
                const adElements = iframeDocument.querySelectorAll('[class*="ad-"], [id*="ad-"], [class*="popup"], [id*="popup"]');
                adElements.forEach(el => {
                  el.style.display = 'none';
                  el.style.opacity = '0';
                  el.style.visibility = 'hidden';
                  el.style.pointerEvents = 'none';
                });
              });
              
              // Start observing the iframe document body
              observer.observe(iframeDocument.body, {
                childList: true,
                subtree: true
              });
            } catch (error) {
              console.log("Cannot access iframe content due to same-origin policy");
            }
          };
        } catch (error) {
          console.log("Error setting up ad blocking:", error);
        }
      }
    };
    
    // Set up ad blocking
    blockPopups();
    
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
      
      {/* Streaming iframe with sandbox attributes to limit certain behaviors */}
      <iframe 
        ref={iframeRef}
        src="https://flstv.online//embed/f1.php" 
        className="position-absolute top-0 start-0 w-100 h-100 border-0"
        allowFullScreen={true}
        title="F1 Live Stream"
        sandbox="allow-scripts allow-same-origin allow-forms"
        scrolling="no"
      />
      
      {/* Transparent overlay to prevent click-jacking */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          zIndex: 5, 
          pointerEvents: 'none',
          background: 'transparent'
        }}
      ></div>
      
      {/* Fullscreen button */}
      <div className="position-absolute bottom-0 end-0 m-3" style={{ zIndex: 20 }}>
        {/* <button 
          onClick={handleFullScreen}
          className="btn btn-danger shadow"
        >
          Enter Fullscreen
        </button> */}
      </div>
    </div>
  );
}