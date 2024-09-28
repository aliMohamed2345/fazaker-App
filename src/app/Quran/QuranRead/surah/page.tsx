'use client'
import SurahNJuzOptions from "@/app/components/Quran/ReadingQuran/SurahNJuzOptions";
import Link from "next/link";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
import { useState } from "react";
import NotFound from "@/app/components/Quran/ListeningToQuran/NotFound";

const Surah = () => {
    const [SearchVal, SetSearchVal] = useState<string>('')

    // Filter surah names based on the search input
    const filteredSurahs = Object.entries(surahNamesArabic).filter(([SurahNumber, surahNameArabic]) =>
        surahNameArabic.includes(SearchVal.trim())
    );

    return (
        <>
            <h1 className="pt-5 text-center pb-3">قرائه القران</h1>
            <SurahNJuzOptions activeNumber={1} />
            <div
                className="p-3 mb-5 rounded-4 mt-4 container w-50 reciter-search-area"
            >
                <form className="align-items-center justify-content-center gap-2 flex-column flex-sm-row">
                    <div className="d-flex gap-4 align-items-center">
                        <input
                            title="ادخل اسم السوره"
                            className="bg-transparent rounded-1 border-0 border-bottom border-success text-secondary shadow-none w-100 text-center"
                            type="text"
                            placeholder={`ادخل اسم السوره`}
                            name="text"
                            value={SearchVal}
                            onChange={(e) => SetSearchVal(e.currentTarget.value)}
                        />
                    </div>
                </form>
            </div>
            <div className="container col mt-5 d-flex flex-wrap justify-content-center reading-quran-content gap-3 flex-row-reverse">
                {filteredSurahs.length > 0 ? (
                    filteredSurahs.map(([SurahNumber, surahNameArabic]) => (
                        <Link
                            key={SurahNumber}
                            href={{
                                pathname: `/Quran/QuranRead/surah/${SurahNumber}`,
                                query: { SurahNumber, surahNameArabic },
                            }}
                            className="text-center p-2 p-sm-3 rounded-3"
                        >
                            <p className="m-0">{surahNameArabic}</p>
                        </Link>
                    ))
                ) : (
                    <NotFound text="لا توجد سوره بهذا الاسم" />
                )}
            </div>
        </>
    );
};

export default Surah;
