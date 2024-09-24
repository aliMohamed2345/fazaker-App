
interface SearchAreaProps {
    searchVal: string;
    SetSearchVal: (value: string) => void;
}

const SearchArea = ({ searchVal, SetSearchVal }: SearchAreaProps) => {
    return (
        <div
            className="p-3 mb-5 rounded-4 mt-4 container w-50 reciter-search-area"
        >
            <form className="align-items-center justify-content-center gap-2 flex-column flex-sm-row">
                <div className="d-flex gap-4 align-items-center">
                    <input
                        title="ادخل اسم السوره"
                        className="bg-transparent rounded-1 border-0 border-bottom border-success text-secondary shadow-none w-100 text-center"
                        type="text"
                        placeholder={`ادخل اسم السوره`}
                        name="text"
                        value={searchVal}
                        onChange={(e) => SetSearchVal(e.currentTarget.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchArea;
