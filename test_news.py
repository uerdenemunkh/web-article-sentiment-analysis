from GoogleNews import GoogleNews

googlenews = GoogleNews(lang='en', region='US')

googlenews.search('apple')

print(googlenews.get_links())
