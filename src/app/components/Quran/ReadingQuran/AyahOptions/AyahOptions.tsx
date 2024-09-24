import { FaPlay, FaPause, FaBook } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import { handleCopyBtn } from "@/app/Azkar/[AzkarId]/page";
import { useRef, useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import TafsirSection from "../TafsirSection";
import { AyahOptionsProps, handlePlayBtn, isAyahSaved, removeFromLocalStorage, saveToLocalStorage } from "./functions";

const AyahOptions = ({ IsOpen, AudioSrc, Ayah, SurahNumber, AyahNumber, SurahName }: AyahOptionsProps) => {
    const [IsPlaying, SetIsPlaying] = useState<boolean>(false);
    const [AyahSaved, SetAyahSaved] = useState<boolean>(false); // Initially not saved
    const [OpenTafsir, SetOpenTafsir] = useState<boolean>(false);
    const AudioRef = useRef<HTMLAudioElement>(null);

    // Check if the ayah is already saved when component mounts
    useEffect(() => {
        const alreadySaved = isAyahSaved(AyahNumber, SurahNumber);
        SetAyahSaved(alreadySaved); // Set the initial saved state based on localStorage
    }, [AyahNumber, SurahNumber]);

    // Save or remove ayah from localStorage when AyahSaved changes
    const handleSaveToggle = () => {
        SetAyahSaved((prev) => {
            const newSavedState = !prev;

            if (newSavedState) {
                // Save ayah to localStorage
                const ayahObject = {
                    surahName: SurahName,
                    ayahNumber: AyahNumber,
                    ayahText: Ayah,
                    surahNumber: SurahNumber,
                };
                saveToLocalStorage(ayahObject);
            } else {
                // Remove ayah from localStorage
                removeFromLocalStorage(AyahNumber, SurahNumber);
            }

            return newSavedState;
        });
    };

    return (
        <>
            {IsOpen && (
                <>
                    {OpenTafsir && (
                        <TafsirSection
                            IsOpen={OpenTafsir}
                            SurahNumber={SurahNumber}
                            AyahNumber={AyahNumber}
                        />
                    )}
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
                        <div className="tooltip-container" onClick={handleSaveToggle}>
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