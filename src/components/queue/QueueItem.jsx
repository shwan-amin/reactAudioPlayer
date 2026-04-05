export default function QueueItem({ track, isActive, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            className={`queue-item${isActive ? " is-active" : ""}`}
        >
            <strong>{track.title}</strong>
            <span>{track.artist || "Unknown artist"}</span>
        </button>
    );
}