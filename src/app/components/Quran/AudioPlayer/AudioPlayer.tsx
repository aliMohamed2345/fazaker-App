import React, { useRef, useState, useEffect } from "react";
import {
    FaPlay,
    FaPause,
    FaForward,
    FaBackward,
    FaStepForward,
    FaStepBackward,
} from "react-icons/fa";
import {
    IoMdVolumeOff,
    IoMdVolumeHigh,
    IoMdVolumeLow,
    IoMdVolumeMute,
    IoMdClose,
} from "react-icons/io";
import {
    AudioPlayerProps,
    AudioStatesProps,
    formatTime,
    AudioStatesInitial,
    handlePlayBtn,
    handleSkipTimeBackward,
    handleSkipTimeForward,
    handleMuteBtn,
} from "./functions";

function ChangeVolumeIcon(mute: boolean, volume: number) {
    if (!mute && volume === 1) return IoMdVolumeHigh;
    else if (!mute && volume < 1 && volume >= 0.5) return IoMdVolumeLow;
    else if (!mute && volume < 0.5 && volume > 0) return IoMdVolumeMute;
    else return IoMdVolumeOff;
}

const AudioPlayer = ({ isOpen, AudioSrc }: AudioPlayerProps) => {
    const [Open, SetOpen] = useState<boolean>(isOpen);

    const AudioRef = useRef<HTMLAudioElement>(null);
    const [audioStates, setAudioStates] = useState<AudioStatesProps>(AudioStatesInitial);

    useEffect(() => {
        console.log("Open state changed:", Open);
        if (AudioRef.current) {
            const audioElement = AudioRef.current;

            const handleLoadedMetadata = () => {
                if (audioElement.duration > 0) {
                    const duration = formatTime(audioElement.duration);
                    console.log("Metadata loaded. Duration:", duration);
                    console.log("Can play through. Duration:", duration);
                    setAudioStates((prevState) => ({ ...prevState, duration }));
                }
            };

            const handleTimeUpdate = () => {
                const currentTime = audioElement.currentTime;
                const duration = audioElement.duration;
                const progress = (currentTime / duration) * 100;

                setAudioStates((prevState) => ({
                    ...prevState,
                    currentTime: formatTime(currentTime),
                    progress: progress,
                }));
            };

            audioElement.addEventListener("canplaythrough", handleLoadedMetadata);
            audioElement.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
                audioElement.removeEventListener("canplaythrough", handleLoadedMetadata);
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, [AudioSrc]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        if (AudioRef.current) {
            AudioRef.current.volume = volume;
        }
        const percentage = volume * 100;
        e.target.style.setProperty(`--slider-before-width`, `${percentage}%`);
        setAudioStates((prevState) => ({
            ...prevState,
            volume,
            isMute: volume === 0,
        }));
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const progress = parseFloat(e.target.value);
        if (AudioRef.current) {
            const newTime = (AudioRef.current.duration * progress) / 100;
            AudioRef.current.currentTime = newTime;
        }
    };

    return (
        <>
            {Open && (
                <div className="d-flex flex-column position-fixed w-100 gap-2 audio-player z-3">
                    <IoMdClose
                        onClick={() => {
                            console.log("Close button clicked");
                            SetOpen(false);
                        }}
                        className="close-btn"
                        style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10 }}
                    />
                    <audio src={AudioSrc} ref={AudioRef} preload="metadata" />
                    <div className="upper-body d-flex justify-content-center align-items-center gap-3 mt-2">
                        <div className="controls d-flex align-items-center gap-2">
                            <FaBackward
                                onClick={() => handleSkipTimeBackward(AudioRef, setAudioStates)}
                                size={20}
                            />
                            <FaStepBackward size={20} />
                            <button
                                onClick={() => handlePlayBtn(AudioRef, audioStates, setAudioStates)}
                                type="button"
                                title="play"
                                className="btn-success play btn rounded-circle d-flex align-items-center justify-content-center"
                            >
                                {audioStates.isPlay ? <FaPause size={25} /> : <FaPlay size={25} />}
                            </button>
                            <FaStepForward size={20} />
                            <FaForward
                                size={20}
                                onClick={() => handleSkipTimeForward(AudioRef, setAudioStates)}
                            />
                        </div>
                        <div className="volume d-flex align-items-center gap-1 justify-content-start">
                            {React.createElement(
                                ChangeVolumeIcon(audioStates.isMute, audioStates.volume),
                                {
                                    onClick: () => handleMuteBtn(AudioRef, audioStates, setAudioStates),
                                    size: 20,
                                }
                            )}
                            <input
                                title="Change Volume"
                                type="range"
                                className="volume-slider position-relative"
                                min="0"
                                max="1"
                                step="0.01"
                                value={audioStates.volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </div>
                    <div className="lower-body d-flex align-items-center gap-4 justify-content-center">
                        <p className="m-0">{audioStates.currentTime}</p>
                        <input
                            title="Change The Current Time"
                            type="range"
                            className="progress-slider position-relative"
                            min="0"
                            max="100"
                            step="0.1"
                            value={audioStates.progress}
                            onChange={handleProgressChange}
                            style={{
                                background: `linear-gradient(to right, var(--bs-green) ${audioStates.progress}%, var(--primary-bg-color) 0%)`,
                            }}
                        />
                        <p className="duration m-0">{audioStates.duration}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AudioPlayer;
