import { useLocation } from 'react-router'
import '../assets/styles/GoogleResult.css';
import { predictURL, Load } from '../utils';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

function Link(props: {children: any}) {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');

    // function onClick(event: React.SyntheticEvent) {
    //     event.preventDefault();
    //     try {
    //         new URL(props.children);
    //         predictURL(props.children).then((data) => {
    //             navigate('/result-page', {state: data, replace: true});
    //         })
    //         navigate('/loading');
    //     } catch {
    //         window.alert('Invalid URL');
    //     }
    // }

    useEffect(() => {
        Load(props.children).then(data => {
            if (data) setTitle(data['title'])
        })
    }, []);

    return (
        <div className='link'>
            <div className='link-title'>{title}</div>
            {props.children}
        </div>
    )
}

export default function GooglResult() {
    const location = useLocation();
    return (
        <div className='Google-result'>
            {<ul>
            {Array.from(location.state.res, (elem: string, idx) => {
                return <li key={idx}><Link>{elem}</Link></li>
            })}
            </ul>
            }
        </div>
    )
}