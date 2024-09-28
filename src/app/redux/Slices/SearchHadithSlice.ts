import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHadithProps {
    Hadith: string,
    HadithBook?: string,
    NumberOfHadith: number
    SearchVal: number
}
let initialState: SearchHadithProps = {
    Hadith: '',
    HadithBook: '',
    NumberOfHadith: 0,
    SearchVal: 0
}
let SearchHAdithSlice = createSlice({
    name: `SearchHadith`,
    initialState,
    reducers: {
        SetHadith(state, action: PayloadAction<string>) {
            state.Hadith = action.payload
        }
        , SetHadithBook(state, action: PayloadAction<string | undefined>) {
            state.HadithBook = action.payload
        }
        , SetNumberOfHadith(state, action: PayloadAction<number>) {
            state.NumberOfHadith = action.payload
        },
    }
})
export const { SetHadith, SetHadithBook, SetNumberOfHadith } = SearchHAdithSlice.actions
export default SearchHAdithSlice.reducer;