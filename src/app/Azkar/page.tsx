import Link from "next/link";
import Nav from "../components/Home/Nav";
let AzkarCategories: string[] = [`أذكار الصباح`, `أذكار المساء`, `أذكار بعد السلام من الصلاة المفروضة`, `تسابيح`, `أذكار النوم`, `أذكار الاستيقاظ`,]

const Azkar = () => {
    return (<>
        <Nav />
        <h1>hello</h1>
        <div className="Azkar-content container h-100  position-relative ">
            <h1 className="text-center mt-5 mb-5">الاذكار</h1>
            <div className="row d-flex gap-5 justify-content-center">
                {AzkarCategories.map((category, i) => (
                    <div className="Azkar-option rounded-5 p-4 col-sm-12 col-md-5 col-lg-3 d-flex  flex-column column-gap-3 ">
                        <h4 className="text-center   fs-5" key={i}>{category}</h4>
                        <Link href={{ pathname: `/Azkar/${encodeURIComponent(category)}`, query: {name:category}}} className="btn btn-success w-50 m-auto">الذهاب</Link>
                    </div>
                ))}

            </div>
        </div>
    </>);
}

export default Azkar;