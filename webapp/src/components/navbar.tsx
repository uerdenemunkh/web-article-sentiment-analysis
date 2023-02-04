import '../assets/styles/navbar.css'
import Addressbar from './addressbar'
import Searchbar from './searchbar';
import { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { INavbarContext } from '../interfaces/usercontext.interface';

function NavButton(props: {title: string, state: INavbarContext, path: string}) {

    const navigate = useNavigate();

    function onClick(event: React.BaseSyntheticEvent) {
        event.preventDefault();
        if (window.location.pathname != props.path) {
            props.state.setState(props.title);
            navigate(props.path);
        }
    }

    let className = 'prevent-select ';

    if (props.state.state === props.title) {
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
    const {navbar} = useContext(UserContext);

    function onSubmit(query: string) {
        if (query) {
            navbar.setState('');
        }
    }

    return (
        <div className="nav-bar">
            {(window.location.pathname === '/result-google')
            ? 
            <Searchbar callback={onSubmit} text=''/>
                : <Addressbar />}
            <NavButton title='Google' state={navbar} path='/'/>
            <NavButton title='Enter text' state={navbar} path='/result-text'/>
        </div>
    )
}