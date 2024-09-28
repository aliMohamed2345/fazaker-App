import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HadithProps {
    number: number;
    arab: string;
    HadithBook?: string;
}

interface HadithContainerState {
    KeyVal: HadithProps[];
}

const initialState: HadithContainerState = {
    KeyVal: []
}

const HadithContainerSlice = createSlice({
    name: 'HadithContainer',
    initialState,
    reducers: {
        SetHadithContent(state, action: PayloadAction<HadithProps[]>) {
            state.KeyVal = action.payload
        }
    }
});

export const { SetHadithContent } = HadithContainerSlice.actions;
export default HadithContainerSlice.reducer;
