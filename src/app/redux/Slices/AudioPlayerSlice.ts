import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AudioPlayerProps {
    isOpen: boolean;
    AudioSrc: string;
    index: number,
    listOfSurah: string[]
}
let initialState: AudioPlayerProps = {
    isOpen: false,
    AudioSrc: "",
    index: 0,
    listOfSurah: []
}
let AudioPlayerSlice = createSlice({
    name: `AudioPlayer`,
    initialState,
    reducers: {
        SetIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        SetAudioSrc(state, action: PayloadAction<string>) {
            state.AudioSrc = action.payload;
        },
        SetListOfSurah(state, action: PayloadAction<string[]>) {
            state.listOfSurah = action.payload;
        },
        SetIndex(state, action: PayloadAction<number>) {
            state.index = action.payload;
        }
    }
})
export default AudioPlayerSlice.reducer;
export let { SetIsOpen, SetIndex, SetAudioSrc, SetListOfSurah } = AudioPlayerSlice.actions