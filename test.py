import requests
from bs4 import BeautifulSoup


page = requests.get('https://www.google.com/search?q=dota+2')

soup = BeautifulSoup(page.text, 'html.parser')

[tag.decompose() for tag in soup("script")]
[tag.decompose() for tag in soup("style")]

# print(soup)

divs = soup.find_all("div")

for div in divs:
    print(div)
    span = div.find_all("span")

# title = soup.find('meta', property='og:title')
# description = soup.find('meta', property='og:description')

# print(title['content'])
# print(description['content'])
