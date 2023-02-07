import '../assets/styles/searchbar.css'
import React from 'react'
import { useState } from 'react';
import { getURL } from '../utils';
import { useNavigate } from 'react-router';
import { useNavbar } from '../context/navbarProvider';

export default function Searchbar(props: {text: string}) {
    const [query, setQuery] = useState<string>(props.text);
    const navigate = useNavigate();
    const [_, setNavState] = useNavbar();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setNavState('result');
        getURL(query).then((data) => {
            navigate("/result-google", {state: data, replace: true},);
        }).catch(reason => navigate('/error', {state: reason}))
        navigate("/loading");
    }

    return (
        <div className="search-bar">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id='query'
                    name='query'
                    value={query}
                    className="search-bar-input"
                    placeholder="Search on Google"
                    onChange={(event) => {setQuery(event.target.value);}}>
                </input>
                <input
                    type="submit"
                    value="Search"
                    className='search-bar-submit'>
                </input>
            </form>
        </div>
    )
}
