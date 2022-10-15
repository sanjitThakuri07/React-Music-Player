import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../utils/utils";

const Player = React.forwardRef(
  ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong }, ref) => {
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
    });
    // event handlers
    const playSongHandler = () => {
      if (isPlaying) {
        ref.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        ref.current.play();
        setIsPlaying(!isPlaying);
      }
    };

    const songEndHandler = async () => {
      const currentIndex = songs?.findIndex(
        (song) => song.id === currentSong.id
      );
      console.log({ currentIndex });
      await setCurrentSong(songs[(currentIndex + 1) % songs?.length]);
      isPlaying && ref.current.play();
    };

    const timeUpdateHandler = (e) => {
      const duration = e.target.duration;
      const currentTime = e.target.currentTime;
      const animation = Math.round(
        (Math.round(currentTime) / Math.round(duration)) * 100
      );

      setSongInfo({
        ...songInfo,
        duration,
        currentTime,
        animationPercentage: animation,
      });
    };

    const getTime = (time) => {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    };

    const dragHandler = (e) => {
      ref.current.currentTime = e.target.value;
      setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = (direction) => {
      const currentIndex = songs?.findIndex(
        (song) => song.id === currentSong.id
      );
      if (direction.toLowerCase() === "skip-back") {
        // check when the index becomes negative
        if ((currentIndex - 1) % songs?.length === -1) {
          setCurrentSong(songs[songs?.length - 1]);
        } else {
          setCurrentSong(songs[(currentIndex - 1) % songs?.length]);
        }
      } else {
        // automatically resets to 0 as the remiander will be 0
        setCurrentSong(songs[(currentIndex + 1) % songs?.length]);
      }

      playAudio({ isPlaying, audioRef: ref });
    };

    // style animation
    const trackAnimation = {
      transform: `translateX(${songInfo?.animationPercentage}%)`,
    };

    return (
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo?.currentTime || 0)}</p>
          <div
            className="track"
            style={{
              backgroundImage: `linear-gradient(to right, ${currentSong?.color[0]}, ${currentSong?.color[1]})`,
            }}
          >
            <input
              min={0}
              max={songInfo?.duration || 0}
              value={songInfo?.currentTime || 0}
              type="range"
              onChange={dragHandler}
            />
            <div className="animate-track" style={trackAnimation}></div>
          </div>
          <p>{getTime(songInfo?.duration || 0)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon
            size="2x"
            className="skip-back"
            icon={faAngleLeft}
            onClick={() => skipTrackHandler("skip-back")}
          />
          <FontAwesomeIcon
            size="2x"
            className="play"
            icon={isPlaying ? faPause : faPlay}
            onClick={playSongHandler}
          />
          <FontAwesomeIcon
            size="2x"
            className="skip-forward"
            icon={faAngleRight}
            onClick={() => skipTrackHandler("skip-forward")}
          />
        </div>
        <audio
          src={currentSong?.audio}
          ref={ref}
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndHandler}
        ></audio>
      </div>
    );
  }
);

export default Player;
