import React, { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data";
import "./styles/app.scss";
import DynamicTable from "./components/DynamicTable";
import Library from "./components/Library";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="App">
      <div className="player__container">
        <Song currentSong={currentSong}></Song>
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          ref={audioRef}
        ></Player>
      </div>
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      ></Library>
    </div>
  );
}

export default App;
