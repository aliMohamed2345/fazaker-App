'use client';
// function
import { copyToClipboard } from "@/app/utils/handleCopyBtn";
// icons
import { IoMdClipboard } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
const MoreOptionsSurah = ({ isOptionsOpened }: { isOptionsOpened: boolean }) => {
    let AudioSrc = useSelector((state: RootState) => state.AudioPlayerOptionsSlice.OptionsAudioSrc)
    let SurahName = useSelector((state: RootState) => state.AudioPlayerOptionsSlice.OptionsSurahName)
    let ReciterName = useSelector((state: RootState) => state.AudioPlayerOptionsSlice.ReciterName)
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
                        <li onClick={() => copyToClipboard(AudioSrc)} className="d-flex align-items-center gap-3 p-2 p-sm-0 p-md-0">
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
