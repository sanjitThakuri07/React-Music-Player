import React from "react";

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
    // check is song is playing
    if (isPlaying) {
      // creating a promise as the song is not load
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
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
