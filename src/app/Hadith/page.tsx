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
import HadithCard from '../components/Hadith/HadithCard';

interface BookProps {
    title: string;
    image: StaticImageData;
    NumberOfHadith: number
    Api: string;
}

interface BooksDataProps {
    books: BookProps[];
}
export let page: number = 1;
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
const Hadith = () => {
    return (
        <div className="container">
            <div className="text-center">
                <h1>Hello World</h1>
                <h1 className="mb-3 mt-4">الحديث</h1>
                <p>
                    مجموعة من الأحاديث الصحيحة من مصادر معتمدة مثل موطأ الإمام مالك، صحيح البخاري، وصحيح مسلم، بالإضافة إلى العديد من الكتب الأخرى التي تناولت السنة النبوية
                </p>
            </div>
            <div className="cards d-flex align-items-center justify-content-center gap-5 flex-row flex-wrap">
                {booksData.books.map((book, i) => {
                    const { title, image, Api, NumberOfHadith } = book;
                    return (
                        <HadithCard title={title} image={image} Api={Api} NumberOfHadith={NumberOfHadith} Key={i}  />
                    );
                })}
            </div>
        </div>
    );
};

export default Hadith;
