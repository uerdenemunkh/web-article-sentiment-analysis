import "../assets/styles/Error.css";
import { useLocation } from "react-router";

export default function Error() {
    const location = useLocation();
    return (
        <div className="Error">
            <div className="error-code">{location.state}</div>
            <div className="error-status">Error :(</div>
        </div>
    )
}