import '../assets/styles/addressbar.css'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../App';

export default function Addressbar() {
    const {navbar} = useContext(UserContext);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            const url = new URL(address);
            navbar.setState('');
            navigate('/result-page', {state: {addr: address}})
        } catch {
            console.log('invalid url');
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