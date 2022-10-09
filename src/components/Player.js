import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = React.forwardRef(
  ({ currentSong, isPlaying, setIsPlaying }, ref) => {
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
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

    const timeUpdateHandler = (e) => {
      const duration = e.target.duration;
      const currentTime = e.target.currentTime;

      setSongInfo({ ...songInfo, duration, currentTime });
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

    return (
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime || 0}
            type="range"
            onChange={dragHandler}
          />
          <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon size="2x" className="skip-back" icon={faAngleLeft} />
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
          />
        </div>
        <audio
          src={currentSong.audio}
          ref={ref}
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
        ></audio>
      </div>
    );
  }
);

export default Player;
