import React, { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data";
import "./styles/app.scss";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLibrary, setActiveLibrary] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="App">
      <Nav
        songTitle={currentSong?.name}
        onClick={() => setActiveLibrary(!activeLibrary)}
      />
      <div
        className="player__container"
        style={{
          marginLeft: !activeLibrary ? "0rem" : "20rem",
          transition: "all .5s",
          transitionDelay: ".1s",
        }}
      >
        <Song currentSong={currentSong}></Song>
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          ref={audioRef}
          songs={songs}
          setCurrentSong={setCurrentSong}
        ></Player>
      </div>
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        activeLibrary={activeLibrary}
      ></Library>
    </div>
  );
}

export default App;
