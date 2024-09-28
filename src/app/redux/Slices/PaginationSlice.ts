import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { SetNumberOfHadith } from "./SearchHadithSlice";

interface PaginationProps {
    Api: string;
    title: string;
    HadithPerPage: number;
}
let initialState: PaginationProps = {
    Api: "",
    title: "",
    HadithPerPage: 0
}
let PaginationSlice = createSlice({
    name: `Pagination`,
    initialState,
    reducers: {
        SetTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        }
        , SetApi(state, action: PayloadAction<string>) {
            state.Api = action.payload
        }
        , SetHadithPerPage(state, action: PayloadAction<number>) {
            state.HadithPerPage = action.payload
        }
    }
})
export const { SetHadithPerPage, SetApi, SetTitle } = PaginationSlice.actions
export default PaginationSlice.reducer; 
