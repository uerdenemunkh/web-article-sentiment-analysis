from flask import Flask, request, jsonify
from google_search import Google
from web_parser import Webparser
from model import Model
import nltk


app = Flask(__name__)
google = Google()
parser = Webparser(driver_dir="C:/webdrivers/edgedriver/msedgedriver.exe")
model = Model()


@app.route('/')
def index():
    return 'Server Test'


@app.get('/search')
def search():
    query = request.args.get('query', None)
    news = request.args.get('news', False, type=bool)
    if query:
        res = google.search(query, 3, news=news)
        return jsonify({"res": res, "news": news})
    return jsonify({"res": []})


@app.post('/predict-url')
def predict_from_url():
    data = request.get_json()
    try:
        url = data['url']
    except KeyError:
        return 'Error', 404
    if not url:
        return 'Error', 404
    text = parser.parseArticle(url)
    if not text:
        # if failed to parse article section parse body section instead
        text = parser.parseBody(data['url'])
    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)

    # Model expects maximum 514 words in one sentence
    valid_sentences = [sentence for sentence in sentences if len(nltk.tokenize.word_tokenize(sentence)) <= 514]

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
        return 'Error', 404
    if not text:
        return 'Error', 404
    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)

    # Model expects maximum 514 words in one sentence
    valid_sentences = [sentence for sentence in sentences if len(nltk.tokenize.word_tokenize(sentence)) <= 514]

    env_claim_preds = model.predict_environmental_claim(valid_sentences)
    fact_check_preds = model.predict_fact_check(valid_sentences)
    return jsonify({"env_preds": env_claim_preds,
                    "fact_preds": fact_check_preds,
                    "sentences": valid_sentences})
