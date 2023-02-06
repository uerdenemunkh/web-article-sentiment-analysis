import "../assets/styles/TextInput.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { predictText } from "../utils";

export default function TextInput() {
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();

    function onClick(e: React.SyntheticEvent) {
        e.preventDefault();
        if (value) {
            predictText(value).then((data) => {
                navigate('/result-page', {state: data, replace: true});
            }).catch(_ => navigate('/error'))
            navigate('/loading');
        } else {
            window.alert('Inset some text')
        }
    }

    return (
        <div className="Text-input">
            <textarea className="text-input" value={value} onChange={({target}) => setValue(target.value)}/>
            <button className="search-bar-submit" onClick={onClick}>Submit</button>
        </div>
    )
}