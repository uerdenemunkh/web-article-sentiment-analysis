import '../assets/styles/navbar.css';
import Addressbar from './addressbar';
import { useNavigate } from 'react-router-dom';
import { useNavbar } from '../context/navbarProvider';
import { useEffect, useState } from 'react';
import Searchbar from './searchbar';

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
    const [navstate, setNavState] = useNavbar();
    const [searchbar, setSearchbar] = useState(<Addressbar />);

    useEffect(() => {
        if (navstate === 'home') setSearchbar(<Addressbar />);
        else setSearchbar(<Searchbar text=''/>)
    }, [navstate])
    return (
        <div className="nav-bar">
            {searchbar}
            <NavButton title='Google' path='/'/>
            <NavButton title='Text' path='/text-input'/>
        </div>
    )
}