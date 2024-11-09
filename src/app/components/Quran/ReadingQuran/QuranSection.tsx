'use client'
import { useState } from "react";
import AyahOptions from "./AyahOptions/AyahOptions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setAyahData } from "@/app/redux/Slices/AyahDataSlice";
import styles from './ReadingQuran.module.css'
// Calculate hizb based on hizbQuarter
function calculateHizb(hizbQuarter: number): string {
    const hizb = Math.floor(hizbQuarter / 4);
    const fraction = hizbQuarter % 4;
    switch (true) {
        case hizbQuarter > 4 && fraction === 3:
            return `ثلاثة ارباع الحزب ${hizb}`;
        case hizbQuarter > 4 && fraction === 2:
            return `نصف الحزب ${hizb}`;
        case hizbQuarter > 4 && fraction === 1:
            return `ربع الحزب ${hizb}`;
        case hizbQuarter > 4 && fraction === 0:
            return `الحزب ${hizb + 1}`;
        case hizbQuarter < 4 && fraction === 3:
            return `ثلاثة ارباع الحزب الاول`;
        case hizbQuarter < 4 && fraction === 2:
            return `نصف الحزب الاول`;
        case hizbQuarter < 4 && fraction === 1:
            return `ربع الحزب الاول`;
        default:
            return `1`;
    }
}

const QuranSection = () => {
    const dispatch = useDispatch();
    const Pages = useSelector((state: RootState) => state.ReadingQuran.page);

    const [AyahOptionsState, SetAyahOptionsState] = useState<{ [key: number]: boolean }>({});

    // Toggle ayah options
    function toggleAyahOptions(ayahNumber: number) {
        SetAyahOptionsState((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[+(key)] = false; // Close all other ayah options
                return acc;
            }, {} as { [key: number]: boolean }),
            [ayahNumber]: !prev[ayahNumber], // Toggle the clicked ayah
        }));
    }
    console.log(styles)
    return (
        <div className={`d-flex flex-column ${styles.allPages}`}>
            {Pages.map((page) => (
                <div className={`p-3 rounded-4 ${styles.page} mb-4`} key={page.page}>
                    <div className={`${styles.pageInfo} border-success border-3 w-100 d-flex align-items-center justify-content-between p-2 rounded-3 mb-3`}>
                        <p className="m-0">جزء: {page.juz}</p>
                        <p className="m-0">حزب: {calculateHizb(page.hizbQuarter)}</p>
                        <p className="m-0">صفحه: {page.page}</p>
                    </div>
                    <div className={`${styles.quran} text-center`}>
                        {page.ayahs.map((ayah) => {
                            dispatch(setAyahData({
                                ayahNumber: ayah.numberInSurah,
                                data: {
                                    IsOpen: AyahOptionsState[ayah.numberInSurah],
                                    AudioSrc: ayah.audio,
                                    Ayah: ayah.text,
                                }
                            }))
                            return (
                                <p
                                    id={`ayah-${ayah.numberInSurah}`}
                                    onClick={() => toggleAyahOptions(ayah.numberInSurah)}
                                    className={`d-inline position-relative ${styles.ayah} ${AyahOptionsState[ayah.numberInSurah] ? `${styles.active}` : ""}`}
                                    key={ayah.numberInSurah}
                                >
                                    {ayah.text}

                                    {AyahOptionsState[ayah.numberInSurah] && (
                                        <AyahOptions
                                            AyahNumber={ayah.numberInSurah}
                                        />
                                    )}
                                    <span className={`${styles.ayahSymbol} position-relative d-inline mx-1`}>
                                        ۝
                                        <span className={`${styles.ayahNumber}`}>{ayah.numberInSurah}</span>
                                    </span>
                                </p>
                            );
                        })}
                        <p className="text-center text-success fw-bold m-0 pt-4 fs-5">{page.page}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuranSection;
