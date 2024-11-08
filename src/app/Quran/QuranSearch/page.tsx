'use client'
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { surahNamesArabic } from '@/app/components/Quran/AudioPlayer/functions';
import Link from 'next/link';
import NotFound from '@/app/components/Quran/ListeningToQuran/NotFound';
import SignLoadingScreen from '@/app/components/Quran/ReadingQuran/SignLoadingScreen';

interface WordsProps {
    text: string;
    highlight: null | boolean;
}

interface ResultsProps {
    verse_key: string;
    text: string;
    words: WordsProps[];
}

interface SearchDataProps {
    results: ResultsProps[];
}

const initialSearchData: SearchDataProps = {
    results: [],
};

const QuranSearch = () => {
    const [inputVal, setInputVal] = useState('');
    const [searchData, setSearchData] = useState<SearchDataProps>(initialSearchData);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!inputVal) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_QURAN_SEARCH}?q=${inputVal}&size=50`);
            const data = await res.json();
            setSearchData(data.search || { results: [] });
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let SaveSearch = localStorage.getItem('SearchQuranWords');
        if (SaveSearch) {
            setInputVal(SaveSearch);
        }
    }, []);

    useEffect(() => {
        if (inputVal) {
            localStorage.setItem('SearchQuranWords', inputVal);
        }
    }, [inputVal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div className="container search-ayah">
            <h1 className="text-center mt-5">البحث</h1>
            <form onSubmit={handleSubmit} className="search-area d-flex gap-3 align-items-center p-3 rounded-4">
                <button type="submit" title="بحث" className={`btn btn-success ${!inputVal ? 'disabled' : ''}`}>
                    <FaSearch />
                </button>
                <input
                    type="text"
                    onChange={(e) => setInputVal(e.target.value)}
                    value={inputVal}
                    placeholder="ادخل الايه"
                    className="bg-transparent rounded-1 text-secondary border-0 border-bottom border-success shadow-none w-100 text-center"
                />
            </form>

            <div className="d-flex container gap-3 mt-5 flex-column mb-5">
                {loading ? (
                    <SignLoadingScreen Number={10} />
                ) : searchData.results.length > 0 ? (
                    searchData.results.map((result, index) => {
                        const [surahNumberString, ayah] = result.verse_key.split(':');
                        const surahNumber = parseInt(surahNumberString, 10); // Convert the surahNumber to an integer
                        const surah = surahNamesArabic[surahNumber]; // Now we use surahNumber as a number

                        return (
                            <Link
                                key={index}
                                href={{
                                    pathname: `/Quran/QuranRead/surah/${surahNumber}`,
                                    query: {
                                        SurahNumber: surahNumber,
                                        surahNameArabic: surah,
                                    },
                                    hash: `ayah-${ayah}`, // Using the ayah number as hash
                                }}
                                className="search-result flex-column p-3 rounded-2 d-flex align-items-start justify-content-center"
                            >
                                <p className="ayah">
                                    {result.words.map((word, i) => (
                                        <span
                                            key={i}
                                            className={`${word.highlight ? 'text-danger fw-bold' : ''}`}
                                        >
                                            {word.text}{' '}
                                        </span>
                                    ))}
                                </p>
                                <div className="info d-flex gap-2">
                                    <p>{ayah},</p>
                                    <p>سوره {surah}</p>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    searched && !loading && inputVal && <NotFound text="لم يتم العثور على نتائج" /> // Show only after search is performed and no results
                )}
            </div>
        </div>
    );
};

export default QuranSearch;
