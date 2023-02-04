import { useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import { getURL } from '../utils';
import Loading from '../components/loading';
import '../assets/styles/GoogleResult.css';

export default function GooglResult() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<string[]>([]);

    useEffect(() => {
        getURL(location.state.query).then((res) => {
            console.log(res);
            setLoading(false);
            setResult(res['res']);
        })
    }, []);

    return (
        <div className='google-result'>
            {loading
            ? <Loading />
            : <ul>
            {Array.from(result, (elem, idx) => {
                return <li key={idx}>{elem}</li>
            })}
            </ul>
            }
        </div>
    )
}