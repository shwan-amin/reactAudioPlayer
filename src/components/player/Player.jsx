import React from "react";
import { PlayerContext } from "../../App.jsx";

export default function Player({ children }) {
    const {
        audioRef,
        currentTrack,
        isPlaying,
        volume,
        queue,
        setCurrentTrack,
        setIsPlaying
    } = React.useContext(PlayerContext);

    const playAudio = React.useCallback(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                setIsPlaying(false);
            });
        }
    }, [audioRef, setIsPlaying]);

    React.useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !currentTrack) {
            return;
        }

        // Only replace the media source when the selected track changes.
        // Reloading on every play/pause toggle resets currentTime to 0.
        audio.src = currentTrack.src;
        audio.load();
    }, [audioRef, currentTrack]);

    React.useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.volume = Math.min(1, Math.max(0, volume));
    }, [audioRef, volume]);

    React.useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !currentTrack) {
            return;
        }

        if (isPlaying) {
            playAudio();
            return;
        }

        audio.pause();
    }, [audioRef, currentTrack, isPlaying, playAudio]);

    React.useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const handleEnded = () => {
            if (queue.length === 0 || !currentTrack) {
                setIsPlaying(false);
                return;
            }

            const index = queue.findIndex((track) => track.id === currentTrack.id);
            const nextIndex = index === -1 ? 0 : (index + 1) % queue.length;
            setCurrentTrack(queue[nextIndex]);
            setIsPlaying(true);
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioRef, currentTrack, queue, setCurrentTrack, setIsPlaying]);

    return (
        <section>
            {children}
        </section>
    );
}