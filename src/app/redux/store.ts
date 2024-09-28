import { configureStore, combineReducers } from "@reduxjs/toolkit";
import SearchHadithSlice from "./Slices/SearchHadithSlice";
import PaginationSlice from "./Slices/PaginationSlice";
import ZekrSlice from "./Slices/ZekrSlice";
import HadithCardSlice from "./Slices/HadithCardSlice";
import HadithContainerSlice from "./Slices/HadithContainerSlice";
import ReadingQuranSlice from "./Slices/ReadingQuranSlice";
const RootReducers = combineReducers({
    SearchHadith: SearchHadithSlice,
    Pagination: PaginationSlice,
    Zekr: ZekrSlice,
    HadithCard: HadithCardSlice,
    HadithContainerSlice: HadithContainerSlice,
    ReadingQuran: ReadingQuranSlice,
})

export const store = configureStore({
    reducer: RootReducers
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;