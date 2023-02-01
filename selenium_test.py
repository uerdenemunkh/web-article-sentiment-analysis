from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options

service = Service("C:\webdrivers\edgedriver\msedgedriver.exe")
options = Options()
options.add_argument('--headless')

driver = webdriver.Edge(service=service, options=options)
driver.get('https://www.google.com/search?q=dota+2/')

tags = driver.find_elements(By.TAG_NAME, 'a')

# ps = driver.find_elements(By.TAG_NAME, 'p')
# 
for tag in tags:
    print(tag.text)
    print()

driver.quit()
