import Muslim from '@/../public/Images/hadith/MuslimBook.webp';
import MowataMalik from '@/../public/Images/hadith/MowataMalik.jpg';
import Tirmizi from '@/../public/Images/hadith/Tirmizi.jpg';
import Nasai from '@/../public/Images/hadith/Nasai.jpg';
import Aldarimi from '@/../public/Images/hadith/Aldarimi.jpg';
import Ahmed from '@/../public/Images/hadith/AhmedIbnHanbl.jpg';
import IbnuMajah from '@/../public/Images/hadith/Ibnu Majah.webp';
import { StaticImageData } from "next/image";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AbuDawood from '@/../public/Images/hadith/Abu Dawood.webp'
import Bukhari from '@/../public/Images/hadith/BukhariBook.jpg'
interface BookProps {
    title: string;
    image: StaticImageData;
    numberOfHadith: number;
    api: string;
}

interface BooksDataProps {
    books: BookProps[];
}

const initialState: BooksDataProps = {
    books: [
        {
            image: Bukhari,
            title: `صحيح البخاري`,
            api: `bukhari`,
            numberOfHadith: 6638
        },
        {
            image: Muslim,
            title: `صحيح مسلم`,
            api: `muslim`,
            numberOfHadith: 4930
        },
        {
            image: MowataMalik,
            title: `موطأ الامام مالك`,
            api: `malik`,
            numberOfHadith: 1587
        },
        {
            image: Tirmizi,
            title: `سنن الترمذي`,
            api: `tirmidzi`,
            numberOfHadith: 3625
        },
        {
            image: IbnuMajah,
            title: `سنن ابن ماجه`,
            api: `ibnu-majah`,
            numberOfHadith: 4285
        },
        {
            image: Nasai,
            title: `سنن النسائي`,
            api: `nasai`,
            numberOfHadith: 5364
        },
        {
            image: AbuDawood,
            title: `سنن ابي داود`,
            api: `abu-daud`,
            numberOfHadith: 4419
        },
        {
            image: Aldarimi,
            title: `سنن الدارمي`,
            api: `darimi`,
            numberOfHadith: 2949
        },
        {
            image: Ahmed,
            title: `مسند الامام احمد`,
            api: `ahmad`,
            numberOfHadith: 4305
        }
    ],
};

const hadithCardSlice = createSlice({
    name: 'HadithCard',
    initialState,
    reducers: {
        setHadithCards(state, action: PayloadAction<BookProps[]>) {
            state.books = action.payload;
        },
    },
});

export default hadithCardSlice.reducer;
export const { setHadithCards } = hadithCardSlice.actions;
