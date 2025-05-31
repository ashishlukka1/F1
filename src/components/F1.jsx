import React, { useState, useRef } from 'react';

const F1StreamComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const refreshStream = () => {
    setIsLoading(true);
    setShowOverlay(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="vh-100 bg-black d-flex flex-column">
        {/* Simple Control Bar */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{backgroundColor: '#1a1a1a'}}>
          <div className="d-flex align-items-center">
            <span className="badge bg-danger me-2 pulse">LIVE</span>
            <small className="text-white">F1 Stream</small>
          </div>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={refreshStream}
            title="Refresh Stream"
          >
            ↻
          </button>
        </div>

        {/* Stream Container with Protection */}
        <div className="flex-grow-1 position-relative overflow-hidden">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="position-absolute top-50 start-50 translate-middle text-white z-3">
              <div className="spinner-border text-danger mb-2" role="status"></div>
              <div>Loading stream...</div>
            </div>
          )}

          {/* Click Protection Overlay */}
          {showOverlay && !isLoading && (
            <div 
              className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center z-2"
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                cursor: 'pointer'
              }}
              onClick={handleOverlayClick}
            >
              <div className="text-center text-white">
                <div className="fs-1 mb-3">▶</div>
                <div>Click to start stream</div>
                <small className="text-muted d-block mt-2">
                  (This prevents accidental ad clicks)
                </small>
              </div>
            </div>
          )}
          
          {/* Stream Iframe */}
          <iframe 
            ref={iframeRef}
            src="https://givemereddit.org/f1/formula1.html"
            frameBorder="0"
            width="100%"
            height="100%"
            allowFullScreen
            scrolling="no"
            allowTransparency
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin allow-presentation"
            style={{
              display: 'block',
              border: 'none',
              backgroundColor: '#000',
              pointerEvents: showOverlay ? 'none' : 'auto'
            }}
            title="F1 Live Stream"
          />
        </div>

        {/* Status Bar */}
        <div className="px-3 py-1" style={{backgroundColor: '#1a1a1a'}}>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-success">
              ● Stream Active
            </small>
            <small className="text-muted">
              Click overlay protects from ads
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        
        .btn-outline-secondary:hover {
          background-color: rgba(108, 117, 125, 0.2);
        }
        
        .spinner-border {
          width: 2rem;
          height: 2rem;
        }
        
        /* Prevent text selection on overlay */
        .position-absolute {
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default F1StreamComponent;