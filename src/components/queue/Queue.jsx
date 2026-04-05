import React from "react";
import { PlayerContext } from "../../App.jsx";
import QueueItem from "./QueueItem.jsx";

export default function Queue() {
    const { queue, currentTrack, setCurrentTrack, setIsPlaying } = React.useContext(PlayerContext);

    if (!queue || queue.length === 0) {
        return <p>Queue is empty.</p>;
    }

    return (
        <section className="queue-list">
            {queue.map((track) => (
                <QueueItem
                    key={track.id}
                    track={track}
                    isActive={currentTrack?.id === track.id}
                    onSelect={() => {
                        setCurrentTrack(track);
                        setIsPlaying(true);
                    }}
                />
            ))}
        </section>
    );
}