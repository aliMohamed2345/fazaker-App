import SurahNJuzOptions from "@/app/components/Quran/ReadingQuran/SurahNJuzOptions";
interface SurahProps {

}
const Surah = () => {
    return (<>
        <h1 className="pt-5 text-center pb-3">قرائه القران</h1>
        <SurahNJuzOptions activeNumber={3} />
    </>);
}

export default Surah;