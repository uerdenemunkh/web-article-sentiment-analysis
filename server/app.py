import grequests
from flask import Flask, request, jsonify
from google_search import Google
from web_parser import Webparser
from model import Model
import nltk
from flask_cors import CORS
from bs4 import BeautifulSoup

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


def returnPrediction(text: str, length: int = 0):
    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)
    if length:
        length = min(length, len(sentences))
    else:
        length = None

    # Model expects maximum 512 words in one sentence
    valid_sentences = [sentence for sentence in sentences[:length] if len(nltk.tokenize.word_tokenize(sentence)) <= 512]

    env_claim_preds = model.predict_environmental_claim(valid_sentences)
    fact_check_preds = model.predict_fact_check(valid_sentences)
    return jsonify({"env_preds": env_claim_preds,
                    "fact_preds": fact_check_preds,
                    "sentences": valid_sentences})


@app.route('/')
def index():
    return 'Server Test'


@app.get('/search')
async def search():
    query = request.args.get('query', None)
    count = request.args.get('count', 5, type=int)
    news = request.args.get('news', False, type=bool)
    titles = []
    if query:
        res = google.search(query, count, news=news)
        if not res:
            return returnStatus("Internal Error - Google not responded", 500)
        try:
            rs = (grequests.get(url) for url in res)
            rss = grequests.map(rs)
        except Exception:
            returnStatus("Internal Error - Failed to load URL headings", 500)
        for resp in rss:
            if resp:
                titles.append(BeautifulSoup(resp.text, 'html.parser').find('title').get_text())
            else:
                titles.append('none')
        return jsonify({"res": res, "news": news, "count": count, "title": titles})
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
    return returnPrediction(text)


@app.post('/predict-text')
def predict_from_text():
    data = request.get_json()
    try:
        text = data['text']
    except KeyError:
        return returnStatus("Bad request - key 'text' not found", 400)
    if not text:
        return returnStatus("Bad request - 'text' has no value", 400)
    return returnPrediction(text)
