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
    let p1 = formatECP(props.p1);
    let p2 = formatFCP(props.p2);

    let pred = 'sentence '
    if (p1 === 'yes') {
        pred += 'sentence-yes'
    } else if (p2 !== 'neutral') {
        pred += "sentence-bad"
    }

    return (
        <div className={pred}>
            <div className='sentence-text'>
                {props.text}
            </div>
            <div className='sentence-pred'>
                <div className='sentence-pred-label'>
                    Environmental claim:
                    <br/>
                    Fact check:
                </div>
                <div className='sentence-pred-value'>
                    {p1}
                    <br/>
                    {p2}
                </div>
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
            {/* <Statistic /> */}
            <ul>
            {Array.from(location.state.sentences, (elem: string, idx) => {
                return <li key={idx}><Sentence text={elem} p1={location.state.env_preds[idx]} p2={location.state.fact_preds[idx]}/></li>
            })}
            </ul>
        </div>
    )
}