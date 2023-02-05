import React from "react"
import { useState, useContext } from "react"

const defaultValue: [string, Function] = ['', () => null]

const NavbarContext = React.createContext(defaultValue);

export function useNavbar(): [string, Function] {
    return useContext(NavbarContext);
}

export function NavbarPrivider(props: any) {

    const [state, setState] = useState('Google');

    return (
        <NavbarContext.Provider value={[state, setState]}>
            {props.children}
        </NavbarContext.Provider>
    )
}