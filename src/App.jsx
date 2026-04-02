import './App.css'
import React from "react"

function App() {
  const PlayerContext = React.createContext();

  return (
    <PlayerContext.Provider value={{
      // Data
      queue,
      currentTrack,
      isPlaying,
      volume,
      audioRef,

      // Functions
      setCurrentTrack,
      setIsPlaying,
      setVolume,
      setQueue
    }}>
    </PlayerContext.Provider>
  );

  return <></>
}

export default App
