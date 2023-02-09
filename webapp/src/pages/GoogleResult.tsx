import { useLocation } from 'react-router'
import '../assets/styles/GoogleResult.css';
import { predictURL } from '../utils';
import { useNavigate } from 'react-router';

function Link(props: {title: string, url: string}) {
    const navigate = useNavigate();

    function onClick(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            new URL(props.url);
            predictURL(props.url).then((data) => {
                navigate('/result-page', {state: data, replace: true});
            }).catch(reason => navigate("/error", {state: reason, replace: true}));
            navigate('/loading');
        } catch {
            window.alert('Invalid URL');
        }
    }

    return (
        <div className='link prevent-select' onClick={onClick}>
            <div className='link-url'>{props.url}</div>
            <div className='link-title'>{props.title}</div>
        </div>
    )
}

export default function GooglResult() {
    const location = useLocation();
    return (
        <div className='Google-result'>
            {<ul>
            {Array.from(location.state.res, (elem: string, idx) => {
                return <li key={idx}><Link title={location.state.title[idx]} url={elem}/></li>
            })}
            </ul>
            }
        </div>
    )
}