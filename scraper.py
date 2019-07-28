import time
import sys
import json
import re
import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

"""FOR RUNNING ON HEROKU"""

# chrome_options = Options()
# chrome_options.headless = True
# chrome_options.binary_location = os.environ.get('GOOGLE_CHROME_BIN')
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument('--disable-gpu')
# browser = webdriver.Chrome(executable_path=os.environ.get(
#     'CHROMEDRIVER'), chrome_options=chrome_options)

"""FOR RUNNING LOCALLY"""

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1366x768")
chrome_options.add_argument("--no-sandbox")
browser = webdriver.Chrome(
    ChromeDriverManager().install(), chrome_options=chrome_options)

second_search = []
text_to_be_returned = {
    "questions":
        [[], []]
}
urls = []


def test():
    browser.get('https://www.google.com')
    url = browser.current_url
    return url


def setup(search_term):

    # clean arrays before starting so same results aren't returned
    text_to_be_returned["questions"][0].clear()
    text_to_be_returned["questions"][1].clear()
    second_search.clear()

    start_scraper(search_term)

    for j in range(len(second_search)):
        search_term = second_search[j]
        start_scraper(search_term)

    scraped_results = format_results()

    return scraped_results


def start_scraper(search_term):

    div_counter = 1

    browser.get('https://www.google.com/search?q=' + search_term)
    time.sleep(3)
    questions = browser.find_elements_by_class_name('related-question-pair')

    for i in questions[:4]:  # only take the first 4

        second_search.append(i.text)
        text_to_be_returned["questions"][0].append(i.text)

        i.click()
        time.sleep(1)

        more = browser.find_element_by_xpath(
            "//div[%s]/g-accordion-expander[1]/div[2]/div[1]/div[1]/div[1]" % div_counter).text

        try:
            url = browser.find_element_by_xpath(
                "//div[%s]/g-accordion-expander[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/a[1]/div[1]/cite[1]" % div_counter).text
        except:
            # some snippets have no url?
            url = ''

        urls.append(url)
        text_to_be_returned["questions"][1].append(more)

        div_counter += 1


def format_results():

    text_minus_escapes = [w.replace('\n', ' ')
                          for w in text_to_be_returned["questions"][1]]

    dictionary = dict(
        zip(text_to_be_returned["questions"][0], zip(text_minus_escapes, urls)))
    # with open('result.json', 'w') as fp:
    #     json.dump(dictionary, fp)

    return dictionary
