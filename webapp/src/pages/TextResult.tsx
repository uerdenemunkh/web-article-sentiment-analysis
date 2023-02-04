import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Loading from "../components/loading";

export default function TextResult() {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <div className="page-result">
            {loading
            ? <Loading />
            : 'Done'}
        </div>
    )
}