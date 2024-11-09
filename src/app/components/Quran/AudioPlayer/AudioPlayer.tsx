import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import styles from '../ListeningToQuran/ListeningToQuran.module.css'
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
    AudioStatesProps,
    formatTime,
    AudioStatesInitial,
    handlePlayBtn,
    handleSkipTimeBackward,
    handleSkipTimeForward,
    handleMuteBtn,
    handleStepBackward,
    handleStepForward
} from "./functions";

function ChangeVolumeIcon(mute: boolean, volume: number) {
    if (!mute && volume === 1) return IoMdVolumeHigh;
    else if (!mute && volume < 1 && volume >= 0.5) return IoMdVolumeLow;
    else if (!mute && volume < 0.5 && volume > 0) return IoMdVolumeMute;
    else return IoMdVolumeOff;
}
const AudioPlayer = () => {
    let { isOpen, AudioSrc, index, listOfSurah } = useSelector((state: RootState) => state.AudioPlayer)
    const [Open, SetOpen] = useState<boolean>(isOpen);
    let [ActiveAudioSrc, setActiveAudioSrc] = useState<string>(AudioSrc);
    const [audioStates, setAudioStates] = useState<AudioStatesProps>(AudioStatesInitial);

    const AudioRef = useRef<HTMLAudioElement>(null);



    useEffect(() => {
        if (Open && AudioRef.current) {
            const audioElement = AudioRef.current;

            // Ensure audio element is ready before attempting to play
            const playAudio = async () => {
                try {
                    await audioElement.play();
                } catch (error) {
                    console.error("Auto-play failed:", error);
                }
                setAudioStates((prevState) => ({
                    ...prevState,
                    isPlay: true,
                }));
            };
            playAudio();
            //  Pause audio when the component is closed
            return () => {
                audioElement.pause();
            };
        }
    }, [Open, AudioSrc, ActiveAudioSrc]);

    useEffect(() => {
        if (AudioRef.current) {
            const audioElement = AudioRef.current;

            const handleLoadedMetadata = () => {
                if (audioElement.duration > 0) {
                    const duration = formatTime(audioElement.duration);
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
                <div className={`d-flex flex-column position-fixed w-100 gap-2 ${styles.audioPlayer} z-3`}>
                    <IoMdClose
                        size={18}
                        onClick={() => {
                            SetOpen(!Open);
                        }}
                        className={`${styles.closeBtn}`}
                    />
                    <audio src={ActiveAudioSrc} ref={AudioRef} preload="metadata" />
                    <div className={`${styles.upperBody} d-flex justify-content-center align-items-center gap-3 mt-2`}>
                        <div className=" d-flex align-items-center gap-2">
                            <FaBackward
                                onClick={() => handleSkipTimeBackward(AudioRef, setAudioStates)}
                                size={20}
                                className="d-none d-sm-block"
                            />
                            <FaStepBackward size={20} onClick={() => handleStepBackward(setActiveAudioSrc, listOfSurah, index)} className={`p-0 ${index === 0 ? 'disabled-btn' : ''}`} />
                            <button
                                onClick={() => handlePlayBtn(AudioRef, audioStates, setAudioStates)}
                                type="button"
                                title="play"
                                className={`btn-success ${styles.play} btn rounded-circle d-flex align-items-center justify-content-center`}
                            >
                                {audioStates.isPlay ? <FaPause size={25} /> : <FaPlay size={25} />}
                            </button>
                            <FaStepForward size={20} className={`${index === listOfSurah.length - 1 ? "disabled-btn" : ""}`} onClick={() => handleStepForward(setActiveAudioSrc, listOfSurah, index)} />
                            <FaForward
                                size={20}
                                onClick={() => handleSkipTimeForward(AudioRef, setAudioStates)}
                                className="d-none d-sm-block"
                            />
                        </div>
                        <div className=" d-flex align-items-center gap-1 justify-content-start">
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
                                className={`${styles.volumeSlider} position-relative`}
                                min="0"
                                max="1"
                                step="0.01"
                                value={audioStates.volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </div>
                    <div className={`${styles.lowerBody} d-flex align-items-center gap-4 justify-content-center`}>
                        <p className="m-0">{audioStates.currentTime}</p>
                        <input
                            title="Change The Current Time"
                            type="range"
                            className={`${styles.progressSlider} position-relative`}
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
