from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.common.exceptions import NoSuchElementException

service = Service("C:\webdrivers\edgedriver\msedgedriver.exe")
options = Options()
options.add_argument('--headless')

driver = webdriver.Edge(service=service, options=options)
driver.get('https://en.wikipedia.org/wiki/Mongolia')

print('text')
try:
    tag = driver.find_element(By.TAG_NAME, 'article')
    print(tag.text)
except NoSuchElementException:
    pass
print('text')

driver.get('https://www.geeksforgeeks.org/performing-google-search-using-python-code/')

print('text')
try:
    tag = driver.find_element(By.TAG_NAME, 'article')
    print(tag.text)
except NoSuchElementException:
    pass
print('text')

# ps = driver.find_elements(By.TAG_NAME, 'p')
# 
# for tag in tags:
#     print(tag.text)
#     print()

driver.quit()
