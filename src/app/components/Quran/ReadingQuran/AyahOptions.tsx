import { FaPlay, FaPause, FaBook } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import { handleCopyBtn } from "@/app/Azkar/[AzkarId]/page";
import { useRef, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import TafsirSection from "./TafsirSection";

interface AyahOptionsProps {
    IsOpen: boolean;
    AudioSrc: string;
    Ayah: string;
    SurahNumber: number,
    AyahNumber: number
}

const handlePlayBtn = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    IsPlaying: boolean,
    SetIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (AudioRef.current) {
        if (!IsPlaying) {
            AudioRef.current.play();
        } else {
            AudioRef.current.pause();
        }
        SetIsPlaying((prev) => !prev);
    }
};

const AyahOptions = ({ IsOpen, AudioSrc, Ayah, SurahNumber, AyahNumber }: AyahOptionsProps) => {
    const [IsPlaying, SetIsPlaying] = useState<boolean>(false);
    const [AyahSaved, SetAyahSaved] = useState<boolean>(false);
    const [OpenTafsir, SetOpenTafsir] = useState<boolean>(false)
    const AudioRef = useRef<HTMLAudioElement>(null);

    return (
        <>
            {IsOpen && (
                <>
                    {
                        OpenTafsir && <TafsirSection IsOpen={OpenTafsir} SurahNumber={SurahNumber} AyahNumber={AyahNumber} />
                    }
                    <audio src={AudioSrc} ref={AudioRef}></audio>
                    <div
                        className="ayah-options position-absolute p-1 rounded-3 d-flex align-items-center gap-1 justify-content-between"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on options
                    >
                        <div className="tooltip-container" onClick={() => SetOpenTafsir(!OpenTafsir)}>
                            <FaBook />
                            <span className="tooltip-text">تفسير</span>
                        </div>
                        <div className="tooltip-container" onClick={() => handleCopyBtn(Ayah)}>
                            <BiClipboard />
                            <span className="tooltip-text">نسخ</span>
                        </div>
                        <div className="tooltip-container" onClick={() => handlePlayBtn(AudioRef, IsPlaying, SetIsPlaying)}>
                            {IsPlaying ? <FaPause /> : <FaPlay />}
                            <span className="tooltip-text">{IsPlaying ? "ايقاف" : "استماع"}</span>
                        </div>
                        <div className="tooltip-container" onClick={() => SetAyahSaved(prev => !prev)}>
                            {AyahSaved ? <FaBookmark /> : <FaRegBookmark />}
                            <span className="tooltip-text">{AyahSaved ? "الغاء" : "حفظ"}</span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AyahOptions;
