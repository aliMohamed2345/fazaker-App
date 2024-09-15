import SurahNJuzOptions from "@/app/components/Quran/ReadingQuran/SurahNJuzOptions";
import Link from "next/link";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
interface SurahProps {

}

const Surah = () => {
    return (<>
        <h1 className="pt-5 text-center pb-3">قرائه القران</h1>
        <SurahNJuzOptions />
        <div className="container col  mt-5 d-flex flex-wrap justify-content-center reading-quran-content gap-3 flex-row-reverse">
            {Object.entries(surahNamesArabic)
                .map(([SurahNumber, surahNameArabic]) => {
                    return (
                        <Link
                            key={SurahNumber}
                            href={{
                                pathname: `/Quran/QuranRead/surah/${SurahNumber}`,
                                query: { SurahNumber: SurahNumber, surahNameArabic: surahNameArabic }
                            }}
                            className="text-center p-2 p-sm-3 rounded-3"
                        >
                            <p className="m-0">{surahNameArabic}</p>
                        </Link>
                    );
                })
            }
        </div>

    </>);
}

export default Surah;