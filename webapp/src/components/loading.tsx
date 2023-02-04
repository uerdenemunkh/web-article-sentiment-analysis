import { Mosaic } from "react-loading-indicators";
import '../assets/styles/loading.css'

export default function Loading() {
    return (
        <div className="loading">
            <Mosaic color="#2192FF" size="medium" text="" textColor="" />
        </div>
    )
}