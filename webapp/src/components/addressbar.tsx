import '../assets/styles/addressbar.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useNavbar } from '../context/navbarProvider';
import { predictURL } from "../utils";

export default function Addressbar() {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [_, setNavState] = useNavbar();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            new URL(address);
            setNavState('');
            predictURL(address).then((data) => {
                navigate('/result-page', {state: data, replace: true});
            })
            navigate('/loading');
        } catch {
            window.alert('Invalid URL');
        }
    }

    return (
        <div className="address-bar">
            <form onSubmit={onSubmit}>
                <input
                    className='address-bar-input'
                    type="text"
                    id='address'
                    name='address'
                    value={address}
                    placeholder="Enter web page URL"
                    onChange={(event) => setAddress(event.target.value)}>
                </input>
            </form>
        </div>
    )
}