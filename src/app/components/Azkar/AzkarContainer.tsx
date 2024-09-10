import Link from "next/link";

interface AzkarContainerProps {
    key?: number,
    category: string
}

const AzkarContainer = ({ key, category }: AzkarContainerProps) => {
    return (<>
        <div className="Azkar-option rounded-5 p-4 d-flex flex-column  ">
            <h4 className="text-center pb-3  fs-5" key={key}>{category}</h4>
            <Link href={{ pathname: `/Azkar/${encodeURIComponent(category)}`, query: { name: category } }} className="btn btn-success w-25 m-auto rounded-4">الذهاب</Link>
        </div></>);
}

export default AzkarContainer;