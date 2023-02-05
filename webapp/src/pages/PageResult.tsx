import { useLocation } from "react-router"

export default function PageResult() {
    const location = useLocation();

    return (
        <div className="page-result">
            {String(location.state.env_preds)}
            {String(location.state.fact_preds)}
            {String(location.state.sentences)}
        </div>
    )
}