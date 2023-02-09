import '../assets/styles/searchbar.css'
import React from 'react'
import { useState } from 'react';
import { getURL } from '../utils';
import { useNavigate } from 'react-router';
import { useNavbar } from '../context/navbarProvider';

export default function Searchbar(props: {text: string}) {
    const [query, setQuery] = useState<string>(props.text);
    const [news, setNews] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const navigate = useNavigate();
    const [_, setNavState] = useNavbar();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setNavState('result');
        getURL(query, news, 20).then((data) => {
            navigate("/result-google", {state: data, replace: true},);
        }).catch(reason => navigate('/error', {state: reason, replace: true}))
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
                    required
                    onChange={(event) => {setQuery(event.target.value);}}>
                </input>
                <input
                    type="submit"
                    value="Search"
                    className='search-bar-submit'>
                </input>
                <div className='search-news-switch'>
                    News
                    <input type="checkbox" checked={news} onChange={e => setNews(!news)}/>
                </div>
            </form>
        </div>
    )
}
