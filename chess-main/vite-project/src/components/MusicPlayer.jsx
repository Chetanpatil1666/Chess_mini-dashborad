import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Handle play/pause action
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Autoplay prevented by browser. User interaction needed.', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Listen for custom trigger to start music (e.g. clicking "Enter the Realm")
    const handleStartMusic = () => {
      setIsPlaying(true);
    };

    window.addEventListener('start-music', handleStartMusic);
    return () => {
      window.removeEventListener('start-music', handleStartMusic);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div className={`music-player-container ${isPlaying ? 'playing' : ''}`}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* Equalizer Visualizer */}
      <div className="equalizer">
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
        <span className="bar bar-3"></span>
        <span className="bar bar-4"></span>
      </div>

      {/* Track info & controls */}
      <div className="player-details">
        <span className="track-title">Lofi Ambience</span>
        <span className="track-status">{isPlaying ? 'Playing' : 'Paused'}</span>
      </div>

      <div className="player-controls">
        {/* Volume Controls */}
        <div className="volume-control-wrapper">
          <button className="control-btn mute-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M13.5 4.06c0-.75-.74-1.23-1.42-.91l-4.69 2.2H4.5A2.25 2.25 0 0 0 2.25 7.6v8.8c0 1.24 1.01 2.25 2.25 2.25h2.89l4.69 2.2c.68.32 1.42-.16 1.42-.91V4.06zM17.78 9.22a.75.75 0 1 0-1.06 1.06L19.44 13l-2.72 2.72a.75.75 0 1 0 1.06 1.06L20.5 14.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L21.56 13l2.72-2.72a.75.75 0 1 0-1.06-1.06L20.5 11.94l-2.72-2.72z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M13.5 4.06c0-.75-.74-1.23-1.42-.91l-4.69 2.2H4.5A2.25 2.25 0 0 0 2.25 7.6v8.8c0 1.24 1.01 2.25 2.25 2.25h2.89l4.69 2.2c.68.32 1.42-.16 1.42-.91V4.06zM18.57 17.47a.75.75 0 1 0 1.06-1.06 6.75 6.75 0 0 0 0-9.53.75.75 0 1 0-1.06 1.06 5.25 5.25 0 0 1 0 7.41z" />
                <path d="M16.44 14.28a.75.75 0 1 0 1.06-1.06 2.25 2.25 0 0 0 0-3.18.75.75 0 1 0-1.06 1.06 0.75 0.75 0 0 1 0 1.06z" />
              </svg>
            )}
          </button>
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>

        {/* Play/Pause Button */}
        <button className="control-btn play-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
