'use client'
import SurahNJuzOptions from "@/app/components/Quran/ReadingQuran/SurahNJuzOptions";
import Link from "next/link";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
import SearchArea from "@/app/components/Quran/ListeningToQuran/SearchArea";
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
            <SearchArea searchVal={SearchVal} SetSearchVal={SetSearchVal} />
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
