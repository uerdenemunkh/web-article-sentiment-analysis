import '../assets/styles/PageResult.css';
import { useLocation } from "react-router";


function formatECP(prediction: string) {
    if (prediction === '0') return 'no';
    return 'yes';
}

function formatFCP(prediction: string) {
    if (prediction === '0') return 'neutral';
    if (prediction === '1') return 'entailment';
    if (prediction === '2') return 'contradiction';
}

function Sentence(props: {text: string, p1: string, p2: string}) {
    return (
        <div className='sentence'>
            <div className='sentence-text'>
                {props.text}
            </div>
            <div className='sentence-label'>
                Environmentla claim:
                <br/>
                Fact check:
            </div>
            <div className='sentence-prediction'>
                {formatECP(props.p1)}
                <br/>
                {formatFCP(props.p2)}
            </div>
        </div>
    )
}

function Statistic(props: any) {
    return (
        <div className='statistic'>
            <h3>Statistic</h3>
        </div>
    )
}

export default function PageResult() {
    const location = useLocation();

    return (
        <div className="Page-result">
            <Statistic />
            <ul>
            {Array.from(location.state.sentences, (elem: string, idx) => {
                return <li key={idx}><Sentence text={elem} p1={location.state.env_preds[idx]} p2={location.state.fact_preds[idx]}/></li>
            })}
            </ul>
        </div>
    )
}