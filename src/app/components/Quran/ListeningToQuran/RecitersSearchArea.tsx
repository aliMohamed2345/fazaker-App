
interface RecitersSearchAreaProps {
    searchVal: string;
    SetSearchVal: (value: string) => void;
}

const RecitersSearchArea = ({
    searchVal,
    SetSearchVal,
}: RecitersSearchAreaProps) => {
    return (
        <>
            <div

                className="p-3 mb-5 rounded-4 mb-4 container w-50"
            >
                <form className="align-items-center justify-content-center gap-2 flex-column flex-sm-row">
                    <div className="d-flex gap-4 align-items-center">
                        <input
                            title="ادخل اسم القارئ"
                            className="bg-transparent rounded-1 border-0 border-bottom border-success text-secondary shadow-none w-100 text-center"
                            type="text"
                            placeholder={`ادخل اسم القارئ`}
                            name="text"
                            value={searchVal}
                            onChange={(e) => SetSearchVal(e.currentTarget.value)}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default RecitersSearchArea;
