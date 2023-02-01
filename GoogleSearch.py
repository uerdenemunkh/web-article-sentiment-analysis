import requests
from bs4 import BeautifulSoup


class Google:

    def __init__(self) -> None:
        pass

    @staticmethod
    def search(query: str, count: int = 1,news: bool = False):
        result = []
        params = {
            "q": query,       # search query
            "hl": "en",   # language of the search
            "gl": "us",   # country of the search
            "num": str(count),   # number of search results per page
        }
        if news:
            params["tbm"] = "nws"  # news results
        google_res = requests.get('https://www.google.com/search', params=params, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70'})
        soup = BeautifulSoup(google_res.text, 'html.parser')
        print(soup)
        try:
            anchors = soup.find(id='search').findAll('a')
            # Sometimes (depending on the User-agent) there is
            # no id "search" in html response...
        except AttributeError:
            # Remove links of the top bar.
            gbar = soup.find(id='gbar')
            if gbar:
                gbar.clear()
            anchors = soup.findAll('a')
        for a in anchors:
            # remove google related links
            if not 'google' in a['href'] and not 'imgurl' in a['href']:
                # filter out invalid result
                if 'url' in a['href']:
                    # remove some '&sa' texts to get real url
                    idx = a['href'].index('&')
                    page_url = a['href'][7:idx]
                    result.append(page_url)
        return result


class PageAnalyzer:

    def __init__(self) -> None:
        pass


def check_query_from_text(text: str, query: str):
    querys = query.split(' ')
    return all(sub in text for sub in querys)
