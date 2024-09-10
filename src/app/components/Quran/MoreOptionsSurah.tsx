'use client';
import { useRef, useState } from "react";
// function
import { handleCopyBtn } from "@/app/Azkar/[AzkarId]/page";
// icons
import { IoMdClipboard } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaPause } from "react-icons/fa6";

interface MoreOptionsSurahProps {
    isOptionsOpened: boolean;
    AudioSrc: string;
    SurahName: string;
    ReciterName: string;
}

const MoreOptionsSurah = ({ isOptionsOpened, AudioSrc, SurahName, ReciterName }: MoreOptionsSurahProps) => {
    // Properly type the ref
    const AudioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, SetIsPlaying] = useState<boolean>(false);
    const DownloadFileName = `سورة ${SurahName} للقارئ ${ReciterName}`;

    function handlePlayBtn(): void {
        if (AudioRef.current) { 
            if (!isPlaying) {
                AudioRef.current.play();
            } else {
                AudioRef.current.pause();
            }
            SetIsPlaying(!isPlaying);
        }
    }

    function handleDownloadBtn(): void {
        const link = document.createElement('a');
        link.href = AudioSrc;
        link.download = DownloadFileName;
        link.click();
    }

    return (
        <>
            {isOptionsOpened && (
                <div className={`surah-more-options rounded-2 p-1`}>
                    <ul className="p-0 m-0">
                        <li onClick={handlePlayBtn} className="d-flex align-items-center gap-3">
                            <p className="logo m-0">{isPlaying ? <FaPause size={19} /> : <FaPlay />}</p>
                            <p className="option m-0 d-none d-sm-block d-md-block">تشغيل</p>
                        </li>
                        <li onClick={handleDownloadBtn} className="d-flex align-items-center gap-3">
                            <p className="logo m-0"><IoMdDownload /></p>
                            <p className="option m-0 d-none d-sm-block d-md-block">تحميل</p>
                        </li>
                        <li onClick={() => handleCopyBtn(AudioSrc)} className="d-flex align-items-center gap-3">
                            <p className="logo m-0"><IoMdClipboard /></p>
                            <p className="option m-0 d-none d-sm-block d-md-block">نسخ الرابط</p>
                        </li>
                    </ul>
                    <audio ref={AudioRef} src={AudioSrc} />
                </div>
            )}
        </>
    );
}

export default MoreOptionsSurah;
