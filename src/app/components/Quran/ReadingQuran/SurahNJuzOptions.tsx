import Link from 'next/link'
interface SurahNSignOptionsProps {
    activeNumber: 1 | 2 | 3
}

const SurahNSignOptions = ({ activeNumber }: SurahNSignOptionsProps) => {
    return (<>
        <div className="surah-juz-container rounded-3 m-auto container d-flex align-items-center justify-content-center">
            <div className="options-bg rounded-pill d-flex align-items-center justify-content-between">
                <Link
                    className={`${activeNumber === 1 ? `active` : ``} rounded-start-pill d-flex align-items-center justify-content-center`}
                    href={{
                        pathname: `/Quran/QuranRead/surah`,
                        query: {},
                    }}>سوره</Link>
                <Link
                    className={` ${activeNumber === 3 ? `active` : ``}  d-flex align-items-center  rounded-end-pill justify-content-center`}
                    href={{
                        pathname: `/Quran/QuranRead/sign`,
                        query: {},
                    }}>محفوظ</Link>

            </div>
        </div>
    </>);
}

export default SurahNSignOptions;