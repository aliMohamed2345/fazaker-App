'use client'
import HadithCard from '../components/Hadith/HadithCard';
import { useDispatch, useSelector } from 'react-redux';
import { setHadithCards } from '../redux/Slices/HadithCardSlice';
import { RootState } from '../redux/store';

const Hadith = () => {
    const hadithCards = useSelector((state: RootState) => state.HadithCard.books);
    const dispatch = useDispatch();
    dispatch(setHadithCards(hadithCards)); // Ensure booksData is correctly imported

    return (
        <div className="container">
            <div className="text-center">
                <h1 className="mb-4 mt-5">الحديث</h1>
                <p>
                    مجموعة من الأحاديث الصحيحة من مصادر معتمدة مثل موطأ الإمام مالك، صحيح البخاري، وصحيح مسلم، بالإضافة إلى العديد من الكتب الأخرى التي تناولت السنة النبوية
                </p>
            </div>
            <div className=" d-flex align-items-center justify-content-center gap-5 flex-row flex-wrap">
                {hadithCards.map((_, i: number) => { // Specify types for map parameters
                    return (
                        <HadithCard Key={i} />
                    );
                })}
            </div>
        </div>
    );
};

export default Hadith;
