import '../assets/styles/Google.css'
import Searchbar from '../components/searchbar'
import googleLogo from '../assets/imgs/Google-logo.png'

export default function Google() {
    return (
        <div className="Google">
            <img src={googleLogo} alt='google-logo'></img>
            <Searchbar text=''/>
        </div>
    )
}