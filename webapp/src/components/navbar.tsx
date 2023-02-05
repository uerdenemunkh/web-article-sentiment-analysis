import '../assets/styles/navbar.css';
import Addressbar from './addressbar';
import Searchbar from './searchbar';
import { useNavigate } from 'react-router-dom';
import { useNavbar } from '../context/navbarProvider';
import { useEffect, useState } from 'react';

function NavButton(props: {title: string, path: string}) {
    const navigate = useNavigate();
    const [navstate, setNavState] = useNavbar();

    function onClick(event: React.BaseSyntheticEvent) {
        event.preventDefault();
        if (window.location.pathname != props.path) {
            setNavState(props.title);
            navigate(props.path);
        }
    }

    let className = 'prevent-select ';

    if (navstate === props.title) {
        className += 'nav-btn-selected';
    } else {
        className += 'nav-btn';
    }

    return (
        <div className={className} onClick={onClick}>
            {props.title}
        </div>
    )
}

export default function Navbar() {
    const [navstate, _] = useNavbar();
    const [searchbar, setSearchbar] = useState(<Addressbar />);

    useEffect(() => {
        if (navstate === 'Google') {
            if (window.location.pathname === '/') {
                setSearchbar(<Addressbar />);
            } else {
                setSearchbar(<Searchbar text=''/>);
            }
        } else {
            setSearchbar(<Addressbar />);
        }
    }, []);

    return (
        <div className="nav-bar">
            {searchbar}
            <NavButton title='Google' path='/'/>
            <NavButton title='Text' path='/text-input'/>
        </div>
    )
}