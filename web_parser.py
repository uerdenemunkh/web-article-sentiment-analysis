from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.common.exceptions import NoSuchElementException


class Webparser:

    def __init__(self, driver_dir) -> None:
        options = Options()
        options.add_argument('--headless')
        options.add_argument("--log-level=3")
        self.driver = webdriver.Edge(service=Service(driver_dir), options=options, verbose=False)
        self.last_url = None

    @property
    def title(self):
        return self.driver.title

    def parseBody(self, link):
        return self.__get_page(link, 'body')

    def parseArticle(self, link):
        return self.__get_page(link, 'article')

    def __get_page(self, link, tag):
        if self.last_url is None or self.last_url != link:
            self.last_url = link
            self.driver.get(link)
        try:
            return self.driver.find_element(By.TAG_NAME, tag).text
        except NoSuchElementException:
            return None
