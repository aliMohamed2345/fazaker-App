import AzkarContainer from "../components/Azkar/AzkarContainer";

let AzkarCategories: string[] = [
    `أذكار الصباح`, `أذكار المساء`, `أذكار بعد السلام من الصلاة المفروضة`,
    `تسابيح`, `أذكار النوم`, `أذكار الاستيقاظ`
];

const Azkar = () => {
    return (
        <div className="Azkar-content container h-100 position-relative mb-5">
            <h1 className="text-center mt-5 mb-5">الاذكار</h1>
            <div className="d-flex flex-column w-100 row-gap-3 justify-content-center">
                {AzkarCategories.map((category, i) => (
                    <AzkarContainer category={category} key={i} />
                ))}
            </div>
        </div>
    );
};

export default Azkar;
