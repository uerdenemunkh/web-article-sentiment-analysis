import '../assets/styles/navbar.css';
import Addressbar from './addressbar';
import { useNavigate } from 'react-router-dom';

function NavButton(props: {title: string, path: string}) {
    const navigate = useNavigate();
    function onClick(event: React.BaseSyntheticEvent) {
        event.preventDefault();
        if (window.location.pathname != props.path) {
            navigate(props.path);
        }
    }
    return (
        <div className={'prevent-select nav-btn'} onClick={onClick}>
            {props.title}
        </div>
    )
}

export default function Navbar() {
    return (
        <div className="nav-bar">
            <Addressbar />
            <NavButton title='Home' path='/'/>
            <NavButton title='Text' path='/text-input'/>
        </div>
    )
}