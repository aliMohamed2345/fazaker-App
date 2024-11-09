import { FaPlay, FaPause, FaBook } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import { copyToClipboard } from "@/app/utils/handleCopyBtn";
import { useRef, useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import TafsirSection from "../TafsirSection";
import { handlePlayBtn, isAyahSaved, removeFromLocalStorage, saveToLocalStorage } from "./functions";
import { useSelector } from "react-redux";
import styles from '../ReadingQuran.module.css'
import { RootState } from "@/app/redux/store";
const AyahOptions = ({ AyahNumber }: { AyahNumber: number }) => {
    let SurahNumber = useSelector((state: RootState) => state.ReadingQuran.SurahNumber);
    let SurahName = useSelector((state: RootState) => state.ReadingQuran.SurahName);
    const { IsOpen, AudioSrc, Ayah } = useSelector((state: RootState) => state.AyahData.ayahs[AyahNumber])
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
                            AyahNumber={AyahNumber}
                        />
                    )}
                    <audio src={AudioSrc} ref={AudioRef}></audio>
                    <div
                        className={`${styles.ayahOptions} position-absolute p-1 rounded-3 d-flex align-items-center gap-1 justify-content-between`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on options
                    >
                        <div className="tooltip-container" onClick={() => SetOpenTafsir(!OpenTafsir)}>
                            <FaBook size={16} />
                            <span className="tooltip-text fs-6">تفسير</span>
                        </div>
                        <div className="tooltip-container" onClick={() => copyToClipboard(Ayah)}>
                            <BiClipboard size={16} />
                            <span className="tooltip-text fs-6">نسخ</span>
                        </div>
                        <div className="tooltip-container" onClick={() => handlePlayBtn(AudioRef, IsPlaying, SetIsPlaying)}>
                            {IsPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                            <span className="tooltip-text fs-6">{IsPlaying ? "ايقاف" : "استماع"}</span>
                        </div>
                        <div className="tooltip-container" onClick={handleSaveToggle}>
                            {AyahSaved ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
                            <span className="tooltip-text fs-6">{AyahSaved ? "الغاء" : "حفظ"}</span>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

export default AyahOptions;
