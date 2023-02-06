from .model import Model
from .google_search import Google
from .web_parser import Webparser
import nltk


google = Google()
parser = Webparser(driver_dir="C:/webdrivers/edgedriver/msedgedriver.exe")
model = Model()

# search query
query = 'mongolian'

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

    # Model expects maximum 514 words in one sentence
    valid_sentences = [sentence for sentence in sentences if len(nltk.tokenize.word_tokenize(sentence)) <= 514]

    env_claim_preds = model.predict_environmental_claim(valid_sentences)
    fact_check_preds = model.predict_fact_check(valid_sentences)

    print(env_claim_preds)
    print(fact_check_preds)


"""
if __name__ == '__main__':
    m = Model()
    text = 'Also known as Vida Manglar—Mangrove Life—the project will sequester almost one million tonnes of CO2 over 30 years by conserving and sustainably managing 7,561 hectares of coastal mangrove ecosystem, marshes, and associated streams.'
    sentences = nltk.tokenize.sent_tokenize(text)
    print(sentences)
    valid_sentences = [sentence for sentence in sentences if len(nltk.tokenize.word_tokenize(sentence)) <= 509]
    print(valid_sentences)
    print('------------------------------------------------------------------')
    res = m.predict_environmental_claim(valid_sentences)
    print(res)
"""