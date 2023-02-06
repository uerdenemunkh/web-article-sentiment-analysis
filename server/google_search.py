from GoogleNews import GoogleNews
from googlesearch import search


class Google:

    def __init__(self) -> None:
        pass

    def search(self, query: str, link_count: int = 1, news: bool = False):
        result = []
        if not news:
            for link in search(query, tld="com", num=link_count, stop=link_count, pause=2):
                result.append(link)
        else:
            googlenews = GoogleNews(lang='en', region='US')
            googlenews.search(query)
            res = googlenews.get_links()
            for i in range(link_count):
                try:
                    result.append(res[i])
                except IndexError:
                    break
        return result
