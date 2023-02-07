import '../assets/styles/PageResult.css';
import "../assets/styles/statistic.css"
import { useLocation } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);


function count(array: string[], item: string) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
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
    let yes_count = count(location.state.env_preds, 'yes');
    let no_count = count(location.state.env_preds, 'no');

    let neutral_count = count(location.state.fact_preds, 'neutral');
    let entailment_count = count(location.state.fact_preds, 'entailment');
    let contradiction_count = count(location.state.fact_preds, 'contradiction');

    const ecData = {
        labels: ["no", "yes"],
        datasets: [
            {
                data: [no_count, yes_count],
                backgroundColor: [
                    'rgba(200, 200, 200, 0.3)',
                    'rgba(50, 255, 50, 0.3)',
                  ],
                  borderColor: [
                    'rgba(170, 170, 170, 1)',
                    'rgba(0, 200, 0, 1)',
                  ],
                borderWidth: 1,
            }
        ]
    }

    const factData = {
        labels: ["neutral", "entailment", "contradiction"],
        datasets: [
            {
                data: [neutral_count, entailment_count, contradiction_count],
                backgroundColor: [
                    'rgba(200, 200, 200, 0.3)',
                    'rgba(200, 200, 0, 0.3)',
                    'rgba(255, 50, 50, 0.3)',
                  ],
                  borderColor: [
                    'rgba(170, 170, 170, 1)',
                    'rgba(150, 150, 0, 1)',
                    'rgba(200, 0, 0, 1)',
                  ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <div className='statistic'>
            <div className='chart-container'>
                <div><Doughnut data={ecData} width={300} height={200} options={{ maintainAspectRatio: false }}/></div>
                <div><Doughnut data={factData} width={350} height={200} options={{ maintainAspectRatio: false }}/></div>
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