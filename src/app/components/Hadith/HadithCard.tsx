import { StaticImageData } from "next/image";
import Image from 'next/image';
import Link from "next/link";
interface HadithCardProps {
    title: string;
    image: StaticImageData;
    NumberOfHadith: number
    page?: number
    Api: string;
    Key: number
}

const HadithCard = ({ image, title, NumberOfHadith, Api, page = 1, Key }: HadithCardProps) => {
    return (
        <div key={Key} className="card mw-100">
            <Image className="card-img-top" src={image} height={250} alt={title} sizes="cover" />
            <div className="card-body">
                <h5 className="card-title text-center">{title}</h5>
                <div className="d-flex align-items-center justify-content-between">
                    <p className='m-0'>{NumberOfHadith}</p>
                    <p className='m-0'>عدد الاحاديث</p>
                </div>
            </div>
            <Link href={{ pathname: `/Hadith/${page}`, query: { Hadith: Api, HadithName: title, NumberOfHadith: NumberOfHadith } }} className="btn btn-success m-auto mb-3">
                الذهاب
            </Link>
        </div>
    );
}

export default HadithCard;