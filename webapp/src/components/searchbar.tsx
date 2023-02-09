import '../assets/styles/searchbar.css'
import React from 'react'
import { useState } from 'react';
import { getURL } from '../utils';
import { useNavigate } from 'react-router';
import Switch from 'react-switch';

export default function Searchbar(props: {text: string}) {
    const [query, setQuery] = useState<string>(props.text);
    const [news, setNews] = useState<boolean>(false);
    const navigate = useNavigate();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
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
                    placeholder={news ? "Search on Google news" : "Search on Google"}
                    required
                    onChange={(event) => {setQuery(event.target.value);}}>
                </input>
                <input
                    type="submit"
                    value="Search"
                    className='search-bar-submit'>
                </input>
            </form>
            <div className='search-news-switch'>
                <Switch onChange={() => setNews(!news)} checked={news} checkedIcon={false} uncheckedIcon={false} onColor="#68B984"/>
            </div>
        </div>
    )
}
