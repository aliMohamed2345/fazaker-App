interface LoadingProps {
    Width?: string,
    Height?: string
    Color?: string
}
function Loading({ Width = "2.5rem", Height = Width, Color = "text-success" }: LoadingProps) {
    return (<>


        <div
            className="d-flex justify-content-center align-items-center  "
        >
            <div
                className={`spinner-border  ${Color} loading-spinner spinner-border-lg d-block`}
                role="status"
                style={{ width: Width, height: Height }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>)
}
export default Loading;