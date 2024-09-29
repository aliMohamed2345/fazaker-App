import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface sajdaProps {
    id: number;
    recommended: boolean;
    obligatory: boolean;
}
interface ayahsProps {
    audio: string;
    hizbQuarter: number;
    page: number;
    text: string;
    juz: number;
    sajda: boolean | sajdaProps;
    numberInSurah: number;
    number: number;
}
export interface pageContentProps {
    ayahs: { text: string, numberInSurah: number, audio: string, IsSaved: boolean }[]; // Array of AyahProps objects
    juz: number;
    hizbQuarter: number;
    page: number;
    surah?: { number: number, name: string, numberOfAyahs: number }
}
interface ReadingQuranProps {
    SurahNumber: number,
    SurahName: string,
    // numberOfAyahs: number,
    page: pageContentProps[]
}
let initialState: ReadingQuranProps = {
    SurahName: '',
    SurahNumber: 0,
    // numberOfAyahs: 0,
    page: []
}
let ReadingQuranSlice = createSlice({
    name: `ReadingQuran`,
    initialState,
    reducers: {
        SetSurahName(state, action: PayloadAction<string>) {
            state.SurahName = action.payload
        },
        SetSurahNumber(state, action: PayloadAction<number>) {
            state.SurahNumber = action.payload
        },
        // SetNumberOfAyahs(state, action: PayloadAction<number>) {
        // state.numberOfAyahs = action.payload
        // }
        SetPages(state, action: PayloadAction<pageContentProps[]>) {
            state.page = action.payload;
        }

    }
})
export default ReadingQuranSlice.reducer;
export let { SetSurahName, SetSurahNumber, SetPages } = ReadingQuranSlice.actions