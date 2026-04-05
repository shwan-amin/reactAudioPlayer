import React from "react";
import { PlayerContext } from "../../App.jsx";
import Slider from "../ui/Slider.jsx";

function formatTime(seconds) {
    const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function SeekBar() {
    const { audioRef, currentTrack } = React.useContext(PlayerContext);
    const [duration, setDuration] = React.useState(0);
    const [position, setPosition] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);

    React.useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const syncTime = () => {
            if (!isDragging) {
                setPosition(audio.currentTime || 0);
            }
        };

        const syncDuration = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
        };

        syncTime();
        syncDuration();

        audio.addEventListener("timeupdate", syncTime);
        audio.addEventListener("loadedmetadata", syncDuration);
        audio.addEventListener("durationchange", syncDuration);

        return () => {
            audio.removeEventListener("timeupdate", syncTime);
            audio.removeEventListener("loadedmetadata", syncDuration);
            audio.removeEventListener("durationchange", syncDuration);
        };
    }, [audioRef, isDragging, currentTrack]);

    React.useEffect(() => {
        if (!currentTrack) {
            setPosition(0);
            setDuration(0);
        }
    }, [currentTrack]);

    const updateSeekPosition = (nextPosition) => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const safePosition = Math.min(Math.max(nextPosition, 0), duration || 0);
        audio.currentTime = safePosition;
        setPosition(safePosition);
    };

    const handleSeek = (event) => {
        updateSeekPosition(Number(event.target.value));
    };

    return (
        <div className="seek-group">
            <Slider
                props={{
                    className: "seek",
                    min: 0,
                    max: duration || 0,
                    step: 0.1,
                    value: position,
                    disabled: !currentTrack || duration === 0,
                    onChange: handleSeek,
                    onMouseDown: () => setIsDragging(true),
                    onMouseUp: () => setIsDragging(false),
                    onTouchStart: () => setIsDragging(true),
                    onTouchEnd: () => setIsDragging(false),
                    "aria-label": "Seek playback"
                }}
            />
            <p className="seek-time">{formatTime(position)} / {formatTime(duration)}</p>
        </div>
    );
}