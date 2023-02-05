import '../assets/styles/Google.css'
import Searchbar from '../components/searchbar'
import googleLogo from '../assets/imgs/Google-logo.png'
import { useNavigate } from 'react-router';
import { useNavbar } from '../context/navbarProvider';

export default function Google() {
    const navigate = useNavigate()
    const [state, setState] = useNavbar();

    function onSubmit(query: string) {
        if (query) {
            setState('');
            navigate('/result-google', {state: {query: query}});
        }
    }

    return (
        <div className="Google">
            <img src={googleLogo} alt='google-logo'></img>
            <Searchbar callback={onSubmit} text=''/>
        </div>
    )
}