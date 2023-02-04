import '../assets/styles/Google.css'
import Searchbar from '../components/searchbar'
import googleLogo from '../assets/imgs/Google-logo.png'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function Google() {
    const {navbar} = useContext(UserContext);
    const navigate = useNavigate()

    function onSubmit(query: string) {
        if (query) {
            navbar.setState('');
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