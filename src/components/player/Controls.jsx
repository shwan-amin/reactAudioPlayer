import React from "react";
import { PlayerContext } from "../../App.jsx";
import Button from "../ui/Button.jsx";

export default function Controls() {
    const {
        queue,
        currentTrack,
        isPlaying,
        setCurrentTrack,
        setIsPlaying
    } = React.useContext(PlayerContext);

    const getCurrentIndex = () => {
        if (!currentTrack) {
            return -1;
        }

        return queue.findIndex((track) => track.id === currentTrack.id);
    };

    const handlePlayPause = () => {
        if (queue.length === 0) {
            return;
        }

        if (!currentTrack) {
            setCurrentTrack(queue[0]);
            setIsPlaying(true);
            return;
        }

        setIsPlaying((previous) => !previous);
    };

    const skipTrack = (direction) => {
        if (queue.length === 0) {
            return;
        }

        const currentIndex = getCurrentIndex();
        const startIndex = currentIndex === -1 ? 0 : currentIndex;
        const nextIndex = (startIndex + direction + queue.length) % queue.length;

        setCurrentTrack(queue[nextIndex]);
        setIsPlaying(true);
    };

    return (
        <div className="controls-row">
            <Button props={{ className: "med control-btn", onClick: () => skipTrack(-1), "aria-label": "Previous track" }}>
                ⏮
            </Button>
            <Button props={{ className: "med control-btn", onClick: handlePlayPause, "aria-label": isPlaying ? "Pause" : "Play" }}>
                {isPlaying ? "⏸" : "▶"}
            </Button>
            <Button props={{ className: "med control-btn", onClick: () => skipTrack(1), "aria-label": "Next track" }}>
                ⏭
            </Button>
        </div>
    );
}