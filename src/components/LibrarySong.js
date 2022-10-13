import React from "react";

import { playAudio } from "../utils/utils";

const LibrarySong = ({
  songs,
  song,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = () => {
    // const selectedSong = songs?.find((sng) => sng?.id === song?.id);
    song && setCurrentSong(song);

    const newSongList = songs?.map((sng) => {
      if (sng.id === song?.id) {
        return { ...sng, active: true };
      } else {
        return { ...sng, active: false };
      }
    });

    setSongs(newSongList);
    // song is playing or not and properly loading the audio
    playAudio({ isPlaying, audioRef });
  };
  return (
    <div
      className={`library-song ${song?.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song?.cover} alt="" />
      <div className="song-description">
        <h3>{song?.name}</h3>
        <h4>{song?.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
