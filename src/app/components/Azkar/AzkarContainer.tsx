import Link from "next/link";
import styles from './Azkar.module.css'
interface AzkarContainerProps {
    key?: number,
    category: string
}

const AzkarContainer = ({ key, category }: AzkarContainerProps) => {
    return (<>
        <div className={`${styles.AzkarOption} rounded-5 p-4 d-flex flex-column  `}>
            <h6 className="text-center pb-3 " key={key}>{category}</h6>
            <Link href={{ pathname: `/Azkar/${encodeURIComponent(category)}`, query: { name: category } }} className="btn btn-success m-auto rounded-4">الذهاب</Link>
        </div></>);
}

export default AzkarContainer;