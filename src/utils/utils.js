export const playAudio = ({ audioRef, isPlaying }) => {
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
