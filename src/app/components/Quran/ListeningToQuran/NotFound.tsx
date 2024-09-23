import { VscCircleSlash } from "react-icons/vsc";
interface NotFoundProps {
    text: string
}

const NotFound = ({ text }: NotFoundProps) => {
    return (<div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="mb-5">{text}</h3>
        <VscCircleSlash size={300} color="var(--bs-danger)" />
    </div>);
}

export default NotFound;