from flask import Flask, request, jsonify
from google_search import Google
from web_parser import Webparser
from model import Model
import nltk
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
google = Google()
parser = Webparser(driver_dir="C:/webdrivers/edgedriver/msedgedriver.exe")
model = Model()
nltk.download('punkt')


def returnStatus(data: str, code: int):
    res = jsonify({
        "status": data,
        "code": code
    })
    res.status_code = code
    return res


@app.route('/')
def index():
    return 'Server Test'


@app.get('/search')
def search():
    query = request.args.get('query', None)
    count = request.args.get('count', 5, type=int)
    news = request.args.get('news', False, type=bool)
    if query:
        res = google.search(query, count, news=news)
        return jsonify({"res": res, "news": news})
    return returnStatus("Bad request - no query provided", 400)


@app.post("/load")
def load():
    data = request.get_json()
    try:
        url = data['url']
    except KeyError:
        return returnStatus("Bad request - key 'url' not found", 400)
    if not url:
        return returnStatus("Bad request - 'url' value not present", 400)
    text = parser.parseArticle(url)
    if not text:
        # if failed to parse article section parse body section instead
        text = parser.parseBody(url)
    # even body not found return error response
    if not text:
        return returnStatus("Bad request - given 'url' not responded", 400)
    return jsonify({"title": parser.title})


@app.post('/predict-url')
def predict_from_url():
    data = request.get_json()
    try:
        url = data['url']
    except KeyError:
        return returnStatus("Bad request - key 'url' not found", 400)
    if not url:
        return returnStatus("Bad request - 'url' value not present", 400)
    text = parser.parseArticle(url)
    if not text:
        # if failed to parse article section parse body section instead
        text = parser.parseBody(url)
    # even body not found return error response
    if not text:
        return returnStatus("Bad request - given 'url' not responded", 400)
    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)
    length = min(30, len(sentences))

    # Model expects maximum 512 words in one sentence
    valid_sentences = [sentence for sentence in sentences[:length] if len(nltk.tokenize.word_tokenize(sentence)) <= 512]

    env_claim_preds = model.predict_environmental_claim(valid_sentences)
    fact_check_preds = model.predict_fact_check(valid_sentences)
    return jsonify({"env_preds": env_claim_preds,
                    "fact_preds": fact_check_preds,
                    "sentences": valid_sentences})


@app.post('/predict-text')
def predict_from_text():
    data = request.get_json()
    try:
        text = data['text']
    except KeyError:
        return returnStatus("Bad request - key 'text' not found", 400)
    if not text:
        return returnStatus("Bad request - 'text' has no value", 400)
    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)

    # Model expects maximum 514 words in one sentence
    valid_sentences = [sentence for sentence in sentences if len(nltk.tokenize.word_tokenize(sentence)) <= 512]

    env_claim_preds = model.predict_environmental_claim(valid_sentences)
    fact_check_preds = model.predict_fact_check(valid_sentences)
    return jsonify({"env_preds": env_claim_preds,
                    "fact_preds": fact_check_preds,
                    "sentences": valid_sentences})
