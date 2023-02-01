from GoogleSearch import Google
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.common.exceptions import NoSuchElementException


google = Google()
service = Service("C:\webdrivers\edgedriver\msedgedriver.exe")
options = Options()
options.add_argument('--headless')
driver = webdriver.Edge(service=service, options=options, verbose=True)

query = 'blue carbon morrosquillo'

res = google.search(query, 5, True)
print(res)

for link in res:
    print(link)
    driver.get(link)
    print(driver.title)
    tag = driver.find_element(By.TAG_NAME, 'article')
    # print(tag.text)

driver.quit()
