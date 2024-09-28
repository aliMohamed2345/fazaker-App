import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZekrProps {
    content: string;
    count: number;
    description: string;
}

interface ZekrState {
    azkar: ZekrProps[];
}

const initialState: ZekrState = {
    azkar: [],
};

const ZekrSlice = createSlice({
    name: 'Zekr',
    initialState,
    reducers: {
        setAzkar: (state, action: PayloadAction<ZekrProps[]>) => {
            state.azkar = action.payload;
        },
        decrementCount: (state, action: PayloadAction<number>) => {
            const zekr = state.azkar[action.payload];
            if (zekr && zekr.count > 0) {
                zekr.count -= 1;
            }
        }
    }
});

export const { setAzkar, decrementCount } = ZekrSlice.actions;
export default ZekrSlice.reducer;
