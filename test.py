from model import Model
from google_search import Google
from web_parser import Webparser
import nltk


google = Google()
parser = Webparser(driver_dir="C:/webdrivers/edgedriver/msedgedriver.exe")
model = Model()

# search query
query = 'climate change'

# search result links
links = google.search(query, link_count=1, news=True)

for link in links:
    print(f'----> {link}')
    # parse article section text from 'link' webpage
    text = parser.parseArticle(link)
    if not text:
        # if failed to parse article section parse body section instead
        text = parser.parseBody(link)
    print(parser.title)
    # print first 100 character from body text
    print(f'{text[0:100]}...', end='\n\n')

    # split text sentence by sentence
    sentences = nltk.tokenize.sent_tokenize(text)

    env_claim_preds = []
    fact_check_preds = []
    for sentence in sentences:
        # Model expects maximum [1, 514] tensor
        if len(sentences) < 514:
            env_pred = model.predict_environmental_claim(sentence)
            fact_pred = model.predict_fact_check(sentence)
            print(sentence)
            print('--->', env_pred)
            print('--->', fact_pred, end='\n\n')
            env_claim_preds.append(env_pred)
            fact_check_preds.append(fact_pred)

    print(env_claim_preds)
    print(fact_check_preds)
