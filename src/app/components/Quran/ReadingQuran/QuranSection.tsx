import { pageContentProps } from "@/app/Quran/QuranRead/surah/[surahId]/page";
import { useState } from "react";

interface QuranSectionProps {
    Pages: pageContentProps[];
}

const QuranSection = ({ Pages, }: QuranSectionProps) => {
    let [AyahOptions, SetAyahOptions] = useState<{ [key: number]: boolean }>({});
    //this function for setting the options when i click to a specific ayah (when you click to new ayah the previous ayah will set to be false)
    function toggleAyahOptions(ayahNumber: number) {
        SetAyahOptions((prev) => {
            // Create a new object where all ayahs are set to false
            let newAyahOptions = Object.keys(prev).reduce((acc, key) => {
                acc[key] = false; // Set all ayahs to false
                return acc;
            }, {} as { [key: number]: boolean });
            // Set the current ayahNumber to true
            newAyahOptions[ayahNumber] = !prev[ayahNumber];
            return newAyahOptions;
        });
    }


    return (
        <>
            <div className="d-flex flex-column all-pages">
                {Pages.map((page) => {
                    let calculatedHizb = page.hizbQuarter % 4 === 0.75 ?
                        `ثلاثه ارباع الحزب ${Math.floor(page.hizbQuarter / 4)}`
                        : page.hizbQuarter % 4 === 0.5 ?
                            `نصف الحزب ${Math.floor(page.hizbQuarter / 4)}`
                            : page.hizbQuarter % 4 === 0.25 ?
                                `ربع الحزب ${Math.floor(page.hizbQuarter / 4)}`
                                : page.hizbQuarter % 4 === 0 ?
                                    `${Math.ceil(page.hizbQuarter / 4)}` :
                                    ``
                    return (
                        <div className="page p-3 rounded-4 mb-4" key={page.page}>
                            <div className="page-info border-success border-3 w-100 d-flex align-items-center justify-content-between p-2 rounded-3 mb-3">
                                <p className="m-0">جزء: {page.juz}</p>
                                <p className="m-0">حزب: {calculatedHizb}</p>
                                <p className="m-0">صفحه: {page.page}</p>
                            </div>
                            <div className="quran text-center">
                                {page.ayahs.map((ayah) => {
                                    return (
                                        <p
                                            id={`ayah-${ayah.numberInSurah}`}
                                            onClick={() => toggleAyahOptions(ayah.numberInSurah)}
                                            className={`d-inline ayah ${AyahOptions[ayah.numberInSurah] ? "active" : ""}`}
                                            key={ayah.numberInSurah}
                                        >
                                            {ayah.text}
                                            <span className="ayah-symbol position-relative d-inline">
                                                ۝
                                                <span className="ayah-number position-absolute">
                                                    {ayah.numberInSurah}
                                                </span>
                                            </span>
                                        </p>
                                    );
                                })}
                                <p className="text-center text-success fw-bold m-0 pt-4 fs-5">{page.page}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default QuranSection;
