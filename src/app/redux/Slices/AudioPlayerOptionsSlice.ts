import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoreOptionsSurahProps {
    OptionsAudioSrc: string;
    OptionsSurahName: string;
    ReciterName: string;
}
let initialState: MoreOptionsSurahProps = {
    OptionsSurahName: "",
    ReciterName: "",
    OptionsAudioSrc: ""
}
let AudioPlayerOptionsSlice = createSlice({
    name: "AudioPlayerOptions",
    initialState,
    reducers: {
        SetOptionsSurahName(state, action: PayloadAction<string>) {
            state.OptionsSurahName = action.payload
        },
        SetReciterName(state, action: PayloadAction<string>) {
            state.ReciterName = action.payload
        },
        SetOptionsAudioSrc(state, action: PayloadAction<string>) {
            state.OptionsAudioSrc = action.payload
        },
    }
})
export default AudioPlayerOptionsSlice.reducer;
export let { SetOptionsSurahName, SetReciterName, SetOptionsAudioSrc } = AudioPlayerOptionsSlice.actions