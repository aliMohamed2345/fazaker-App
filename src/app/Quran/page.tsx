import Link from "next/link";
let options = [{
    name: `الاستماع للقران`,
    pathname: `/Quran/QuranRecite`,

},
{
    name: "قرائه القران",
    pathname: `Quran/QuranRead/surah`
}
]
const Quran = () => {
    return (<>
        <p></p>
        <h1 className="text-center pt-5 mb-5">القرأن الكريم </h1>
        <div className="container d-flex gap-4 flex-column">
            {options.map((option, i) => (
                <div key={i}  className="d-flex flex-column justify-content-center quran-options p-4 rounded-5">
                    <h5 className="text-center m-0 pb-3">{option.name}</h5>
                    <Link className="m-auto btn btn-success w-25 rounded-4" href={option.pathname}>
                        الذهاب
                    </Link>
                </div>
            ))}
        </div>
    </>);
}

export default Quran;