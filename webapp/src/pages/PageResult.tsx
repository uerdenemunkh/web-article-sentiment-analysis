import '../assets/styles/PageResult.css';
import "../assets/styles/statistic.css"
import { useLocation } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);


function count(array: string[], item: string) {
    let count = 0;
    for (let elem in array) {
        if (elem === item) {
            count += 1;
        }
    }
    return count;
}

function Sentence(props: {text: string, p1: string, p2: string}) {
    let pred = 'sentence '
    if (props.p1 === 'yes') {
        pred += 'sentence-yes'
    } else if (props.p2 !== 'neutral') {
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
                    {props.p1}
                    <br/>
                    {props.p2}
                </div>
            </div>
        </div>
    )
}

function Statistic() {
    const location = useLocation();

    console.log(location.state.env_preds);

    let yes_count = count(location.state.env_preds, 'yes');
    let no_count = count(location.state.env_preds, 'no');

    // console.log(yes_count);
    // console.log(no_count);

    const ecData = {
        labels: ["no", "yes"]
    }
    const ec = location.state.env_preds;

    return (
        <div className='statistic'>
            <h3>Prediction result</h3>
            <div className='chart-container'>
                {/* <Doughnut data={} options={{ maintainAspectRatio: false }}/> */}
            </div>
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