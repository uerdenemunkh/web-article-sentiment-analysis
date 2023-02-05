import { useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import '../assets/styles/GoogleResult.css';

export default function GooglResult() {
    const location = useLocation();

    return (
        <div className='google-result'>
            Google result
            {<ul>
            {Array.from(location.state.res, (elem: string, idx) => {
                return <li key={idx}>{elem}</li>
            })}
            </ul>
            }
        </div>
    )
}