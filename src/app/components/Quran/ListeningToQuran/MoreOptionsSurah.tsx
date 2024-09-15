'use client';
// function
import { handleCopyBtn } from "@/app/Azkar/[AzkarId]/page";
// icons
import { IoMdClipboard } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";

interface MoreOptionsSurahProps {
    isOptionsOpened: boolean;
    AudioSrc: string;
    SurahName: string;
    ReciterName: string;
}

const MoreOptionsSurah = ({ isOptionsOpened, AudioSrc, SurahName, ReciterName }: MoreOptionsSurahProps) => {
    // Properly type the ref
    const DownloadFileName = `سورة ${SurahName} للقارئ ${ReciterName}`;

    const handleDownloadBtn = async () => {
        try {
            // Fetch the audio file as a blob
            const response = await fetch(AudioSrc);
            const blob = await response.blob();
            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', DownloadFileName);
            document.body.appendChild(link);
            link.click();
            // Clean up by revoking the object URL and removing the link element
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }

    return (
        <>
            {isOptionsOpened && (
                <div className={`surah-more-options rounded-2 pb-1 pt-1`}>
                    <ul className="p-0 m-0">
                        <li onClick={handleDownloadBtn} className="d-flex align-items-center gap-3 p-2 p-sm-0 p-md-0">
                            <p className="logo m-0"><IoMdDownload /></p>
                            <p className="option m-0 d-none d-sm-block d-md-block">تحميل</p>
                        </li>
                        <li onClick={() => handleCopyBtn(AudioSrc)} className="d-flex align-items-center gap-3 p-2 p-sm-0 p-md-0">
                            <p className="logo m-0"><IoMdClipboard /></p>
                            <p className="option m-0 d-none d-sm-block d-md-block">نسخ الرابط</p>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default MoreOptionsSurah;