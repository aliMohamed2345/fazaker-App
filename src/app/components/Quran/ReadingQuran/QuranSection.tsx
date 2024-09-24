import { useState } from "react";
import AyahOptions from "./AyahOptions/AyahOptions";
import { pageContentProps } from "./FunctionsAndObjects";
interface QuranSectionProps {
    Pages: pageContentProps[];
    SurahNumber: number;
    SurahName: string
}
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

const QuranSection = ({ Pages, SurahNumber, SurahName }: QuranSectionProps) => {
    const [AyahOptionsState, SetAyahOptionsState] = useState<{ [key: number]: boolean }>({});
    const [SavedAyahs, SetSavedAyahs] = useState<{ [key: number]: boolean }>({});

    // Toggle ayah options
    function toggleAyahOptions(ayahNumber: number) {
        SetAyahOptionsState((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[+(key)] = false;
                return acc;
            }, {} as { [key: number]: boolean }),
            [ayahNumber]: !prev[ayahNumber],
        }));
    }

    // Handle saving ayah
    function handleSaveAyah(ayahNumber: number) {
        SetSavedAyahs((prev) => ({
            ...prev,
            [ayahNumber]: !prev[ayahNumber],
        }));
    }




    return (
        <div className="d-flex flex-column all-pages">
            {Pages.map((page) => (
                <div className="page p-3 rounded-4 mb-4" key={page.page}>
                    <div className="page-info border-success border-3 w-100 d-flex align-items-center justify-content-between p-2 rounded-3 mb-3">
                        <p className="m-0">جزء: {page.juz}</p>
                        <p className="m-0">حزب: {calculateHizb(page.hizbQuarter)}</p>
                        <p className="m-0">صفحه: {page.page}</p>
                    </div>
                    <div className="quran text-center">
                        {page.ayahs.map((ayah) => (
                            <p
                                id={`ayah-${ayah.numberInSurah}`}
                                onClick={() => toggleAyahOptions(ayah.numberInSurah)}
                                className={`d-inline ${SavedAyahs[ayah.numberInSurah] ? 'bg-danger' : ''} position-relative ayah ${AyahOptionsState[ayah.numberInSurah] ? "active" : ""}`}
                                key={ayah.numberInSurah}
                            >
                                {ayah.text}

                                {AyahOptionsState[ayah.numberInSurah] && (
                                    <>
                                        <AyahOptions
                                            IsOpen={AyahOptionsState[ayah.numberInSurah]}
                                            AudioSrc={ayah.audio}
                                            Ayah={ayah.text}
                                            SurahNumber={SurahNumber}
                                            SurahName={SurahName}
                                            AyahNumber={ayah.numberInSurah}
                                        />
                                    </>
                                )}

                                <span className="ayah-symbol position-relative d-inline mx-1">
                                    ۝
                                    <span className="ayah-number">{ayah.numberInSurah}</span>
                                </span>
                            </p>
                        ))}
                        <p className="text-center text-success fw-bold m-0 pt-4 fs-5">{page.page}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuranSection;
