import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AyahOptionsProps {
    IsOpen: boolean;
    AudioSrc: string;
    Ayah: string;
}
interface AyahState {
    ayahs: { [key: number]: AyahOptionsProps };
}
let initialState: AyahState = {
    ayahs: {}
}
let AyahDataSlice = createSlice({
    name: `AyahDataSlice`,
    initialState,
    reducers: {
        setAyahData(state, action: PayloadAction<{ ayahNumber: number; data: AyahOptionsProps }>) {
            state.ayahs[action.payload.ayahNumber] = action.payload.data;
        }
    }
})
export default AyahDataSlice.reducer;
export let { setAyahData } = AyahDataSlice.actions;





