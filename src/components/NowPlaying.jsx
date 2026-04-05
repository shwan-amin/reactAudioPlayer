import React from "react";
import { PlayerContext } from "../App.jsx";

export default function NowPlaying() {
  const { isPlaying, currentTrack } = React.useContext(PlayerContext);
  const trackLine = currentTrack
    ? `${currentTrack.title} - ${currentTrack.artist || "Unknown artist"}`
    : "No track selected - Unknown artist";

  return (
    <section className="now-playing">
      <p className="now-playing__status">{isPlaying ? "Playing" : "Paused"}</p>
      <div className="now-playing__marquee" aria-label={trackLine}>
        <h2 className="now-playing__line">{trackLine}</h2>
      </div>
    </section>
  );
}