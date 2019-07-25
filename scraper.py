import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1366x768")
chrome_options.add_argument("--no-sandbox")

browser = webdriver.Chrome(ChromeDriverManager().install(), 0, chrome_options)

second_round = []
text_to_be_returned = []


def setup(search_term):

    start_scraper(search_term)

    for j in range(len(second_round)):
        search_term = second_round[j]
        start_scraper(search_term)

    browser.close()
    return text_to_be_returned


def start_scraper(search_term):
    browser.get('https://www.google.com/search?q=' + search_term)
    time.sleep(3)
    questions = browser.find_elements_by_class_name('related-question-pair')

    for i in questions[:4]:  # only take the first 4

        second_round.append(i.text)
        text_to_be_returned.append(i.text)

        i.click()
        time.sleep(1)
        # more = i.find_element_by_class_name('gy6Qzb')
        # print(more.text)
