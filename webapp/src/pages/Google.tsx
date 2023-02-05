import '../assets/styles/Google.css'
import Searchbar from '../components/searchbar'
import googleLogo from '../assets/imgs/Google-logo.png'
import { useNavbar } from '../context/navbarProvider'
import { useEffect } from 'react';

export default function Google() {
    const [navstate, setNavState] = useNavbar();

    useEffect(() => {
        setNavState("home");
    }, [navstate])

    return (
        <div className="Google">
            <img src={googleLogo} alt='google-logo'></img>
            <Searchbar text=''/>
        </div>
    )
}