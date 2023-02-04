import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { predictURL } from "../utils";
import Loading from "../components/loading";

export default function PageResult() {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        predictURL(location.state.addr).then((res) => {
            if (res) {
                console.log(res)
                setLoading(false);
            }
        })
    }, [])

    return (
        <div className="page-result">
            {loading
            ? <Loading />
            : location.state.addr}
        </div>
    )
}