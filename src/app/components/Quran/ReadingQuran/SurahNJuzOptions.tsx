import Link from 'next/link'
interface SurahNJuzOptionsProps {

}

const SurahNJuzOptions = () => {
    return (<>
        <div className="surah-juz-container rounded-3 m-auto container d-flex align-items-center justify-content-center">
            <div className="options-bg rounded-pill d-flex align-items-center justify-content-between">
                <Link
                    className='active rounded-start-pill d-flex align-items-center justify-content-center'
                    href={{
                        pathname: `/Quran/QuranRead/surah`,
                        query: {},
                    }}>سوره</Link>
                <Link
                    className='  d-flex align-items-center justify-content-center'
                    href={{
                        pathname: `/Quran/QuranRead/juz`,
                        query: {},
                    }}>جزء</Link>
                <Link
                    className='  d-flex align-items-center  rounded-end-pill justify-content-center'
                    href={{
                        pathname: `/Quran/QuranRead/juz`,
                        query: {},
                    }}>مميزه بعلامه</Link>
                    
            </div>
        </div>
    </>);
}

export default SurahNJuzOptions;