export interface sajdaProps {
    id: number;
    recommended: boolean;
    obligatory: boolean;
}

export interface ayahsProps {
    audio: string;
    hizbQuarter: number;
    page: number;
    text: string;
    juz: number;
    sajda: boolean | sajdaProps;
    numberInSurah: number;
    number: number;
}

export interface SurahIdProps {
    name: string;
    number: number;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: ayahsProps[];
}
export interface pageContentProps {
    ayahs: { text: string, numberInSurah: number, audio: string, IsSaved: boolean }[]; // Array of AyahProps objects
    juz: number;
    hizbQuarter: number;
    page: number;
    surah?: { number: number, name: string, numberOfAyahs: number }
}

export let InitialSurahData: SurahIdProps = {
    name: '',
    number: 0,
    numberOfAyahs: 0,
    revelationType: '',
    ayahs: []
};