import { booksData, } from '../components/Hadith/pageFunctionAndObjects';
import HadithCard from '../components/Hadith/HadithCard';


const Hadith = () => {
    return (
        <div className="container">
            <div className="text-center">
                {/* <h1>Hello World</h1> */}
                <h1 className="mb-4 mt-5">الحديث</h1>
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
