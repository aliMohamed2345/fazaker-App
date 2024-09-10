
//import the images 
import Bukhari from '@/../public/Images/hadith/BukhariBook.jpg';
import Muslim from '@/../public/Images/hadith/MuslimBook.webp';
import MowataMalik from '@/../public/Images/hadith/MowataMalik.jpg';
import Tirmizi from '@/../public/Images/hadith/Tirmizi.jpg';
import IbnuMajah from '@/../public/Images/hadith/Ibnu Majah.webp';
import Nasai from '@/../public/Images/hadith/Nasai.jpg';
import AbuDawood from '@/../public/Images/hadith/Abu Dawood.webp';
import Aldarimi from '@/../public/Images/hadith/Aldarimi.jpg';
import Ahmed from '@/../public/Images/hadith/AhmedIbnHanbl.jpg';


import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
export interface BookProps {
    title: string;
    image: StaticImageData;
    NumberOfHadith: number
    Api: string;
}

export interface BooksDataProps {
    books: BookProps[];
}
// export let page: number = 1;
export let booksData: BooksDataProps = {
    books: [
        {
            image: Bukhari,
            title: `صحيح البخاري`,
            Api: `bukhari`,
            NumberOfHadith: 6638
        },
        {
            image: Muslim,
            title: `صحيح مسلم`,
            Api: `muslim`,
            NumberOfHadith: 4930
        },
        {
            image: MowataMalik,
            title: `موطأ الامام مالك`,
            Api: `malik`,
            NumberOfHadith: 1587
        },
        {
            image: Tirmizi,
            title: `سنن الترمذي`,
            Api: `tirmidzi`,
            NumberOfHadith: 3625
        },
        {
            image: IbnuMajah,
            title: `سنن ابن ماجه`,
            Api: `ibnu-majah`,
            NumberOfHadith: 4285
        },
        {
            image: Nasai,
            title: `سنن النسائي`,
            Api: `nasai`,
            NumberOfHadith: 5364
        },
        {
            image: AbuDawood,
            title: `سنن ابي داود`,
            Api: `abu-daud`,
            NumberOfHadith: 4419
        },
        {
            image: Aldarimi,
            title: `سنن الدارمي`,
            Api: `darimi`,
            NumberOfHadith: 2949
        },
        {
            image: Ahmed,
            title: `مسند الامام احمد`,
            Api: `ahmad`,
            NumberOfHadith: 4305
        }
    ],
};