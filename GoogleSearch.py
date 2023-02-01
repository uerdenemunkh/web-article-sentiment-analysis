from GoogleNews import GoogleNews
from googlesearch import search


class Google:

    def __init__(self) -> None:
        self.googlenews = GoogleNews(lang='en', region='US')

    def search(self, query: str, count: int = 1, news: bool = False):
        result = []
        if not news:
            for j in search(query, tld="com", num=count, stop=1, pause=2):
                result.append(j)
        else:
            self.googlenews.search(query)
            res = self.googlenews.get_links()
            for i in range(count):
                try:
                    result.append(res[i])
                except IndexError:
                    break
        return result


class PageAnalyzer:

    def __init__(self) -> None:
        pass


def check_query_from_text(text: str, query: str):
    querys = query.split(' ')
    return all(sub in text for sub in querys)
