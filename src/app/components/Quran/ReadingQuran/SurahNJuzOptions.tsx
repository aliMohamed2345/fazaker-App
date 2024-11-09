import Link from 'next/link'
import styles from './ReadingQuran.module.css'
interface SurahNSignOptionsProps {
    activeNumber: 1 | 2 | 3
}
console.log(styles);
const SurahNSignOptions = ({ activeNumber }: SurahNSignOptionsProps) => {
    return (<>
        <div className={`${styles.surahJuzContainer} rounded-3 m-auto container d-flex align-items-center justify-content-center`}>
            <div className={`${styles.optionsBg} rounded-pill d-flex align-items-center justify-content-between`}>
                <Link
                    className={`${activeNumber === 1 ? `${styles.active}` : ``} rounded-start-pill d-flex align-items-center justify-content-center`}
                    href={{
                        pathname: `/Quran/QuranRead/surah`,
                        query: {},
                    }}>سوره</Link>
                <Link
                    className={` ${activeNumber === 3 ? `${styles.active}` : ``}  d-flex align-items-center  rounded-end-pill justify-content-center`}
                    href={{
                        pathname: `/Quran/QuranRead/sign`,
                        query: {},
                    }}>محفوظ</Link>

            </div>
        </div>
    </>);
}

export default SurahNSignOptions;