import '../assets/styles/searchbar.css'
import ISearchBar from '../interfaces/searchbar.interface'
import React from 'react'
import { useState } from 'react';

export default function Searchbar(props: ISearchBar) {

    const [query, setQuery] = useState<string>(props.text);

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        props.callback(query);
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
