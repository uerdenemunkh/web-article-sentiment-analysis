from googlesearch import search
from GoogleNews import GoogleNews
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.common.exceptions import NoSuchElementException


def get_link(query):
    result = []
    for j in search(query, tld="com", num=1, stop=1, pause=2):
        result.append(j)
    return result


# to search
query = "mongolia"

links = get_link(query)
print(links)

# service = Service("C:\webdrivers\edgedriver\msedgedriver.exe")
# options = Options()
# options.add_argument('--headless')
# driver = webdriver.Edge(service=service, options=options)

# for link in links:
#     driver.get(link)
#     print('text')
#     try:
#         tag = driver.find_element(By.TAG_NAME, 'article')
#         print(tag.text)
#     except NoSuchElementException:
#         pass
#     print('text')

# driver.quit()