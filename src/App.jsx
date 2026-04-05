import './App.css'
import React from "react"
import Card from './components/ui/Card.jsx'
import Button from "./components/ui/Button.jsx"
import NowPlaying from "./components/NowPlaying.jsx"
import Player from "./components/player/Player.jsx"
import Controls from "./components/player/Controls.jsx"
import SeekBar from "./components/player/SeekBar.jsx"
import Queue from "./components/queue/Queue.jsx"

export const PlayerContext = React.createContext();
function App() {
  // Init the context that will be accessed from the whole App

  // Set Default States
  const [queue, setQueue] = React.useState([
    {
      id: 1,
      title: "Stove Steak",
      artist: "Gagmesharkoff",
      src: "../Gagmesharkoff - Stove Steak.mp3"
    },
    {
      id: 2,
      title: "Enchanted walley whistle",
      artist: "Ondrosik",
      src: "../Ondrosik - Enchanted walley whistle extended version.mp3"
    },
    {
      id: 3,
      title: "In A Twinkling of An Eye",
      artist: "Pamela Yuen",
      src: "../Pamela Yuen - In A Twinkling Of An Eye.mp3"
    }
  ]);

  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (!currentTrack && queue.length > 0) {
      setCurrentTrack(queue[0]);
    }
  }, [currentTrack, queue]);

  return (
    <PlayerContext.Provider value={{
      // Data
      queue,
      currentTrack,
      isPlaying,
      volume,
      audioRef,

      // Functions
      setQueue,
      setCurrentTrack,
      setIsPlaying,
      setVolume
    }}>
      <audio ref={audioRef} preload="metadata" />

      <Card props={{ className: "card--track" }}>
        <NowPlaying />
      </Card>

      <Card props={{ className: "card--controls" }}>
        <Player>
          <Controls />
          <SeekBar />
        </Player>
      </Card>

      <Card props={{ className: "card--queue" }}>
        <Queue />
      </Card>
    </PlayerContext.Provider>
  );
}

export default App
