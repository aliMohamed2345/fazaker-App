import Image from 'next/image';
import Link from "next/link";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import styles from '@/app/components/Hadith/Hadith.module.css'
const HadithCard = ({ Key }: { Key: number }) => {
    let HadithCard = useSelector((state: RootState) => state.HadithCard.books[Key]);
    let { api, image, numberOfHadith, title } = HadithCard;
    return (
        <div key={Key} className={`${styles.card} mw-100 rounded-3 overflow-hidden`}>
            <Image className="card-img-top " src={image} height={250} alt={title} sizes="cover" loading='lazy' />
            <div className={`${styles.cardBody}`}>
                <h6 className="card-title text-center">{title}</h6>
                <div className="d-flex align-items-center justify-content-between mt-4">
                    <p className='m-0'>{numberOfHadith}</p>
                    <p className='m-0'>عدد الاحاديث</p>
                </div>
            </div>
            <Link href={{ pathname: `/Hadith/${1}`, query: { Hadith: api, HadithName: title, NumberOfHadith: numberOfHadith } }} className="btn btn-success my-3 mx-auto d-flex justify-content-center w-50">
                الذهاب
            </Link>
        </div>
    );
}

export default HadithCard;