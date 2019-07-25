import json
import sys
import time

from flask.json import jsonify
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")

browser = webdriver.Chrome(ChromeDriverManager().install(), 0, chrome_options)

second_round = []
text_to_be_returned = {
    "questions":
        [[],[]]
}


def main():
    search_term = 'donedeal'
    start_scraper(search_term)

    for j in range(len(second_round)):
        search_term = second_round[j]
        start_scraper(search_term)

    write_to_file()
    browser.close()


def start_scraper(search_term):
    browser.get('https://www.google.com/search?q=' + search_term)
    time.sleep(3)
    questions = browser.find_elements_by_class_name('related-question-pair')

    for i in questions[:4]:  # only take the first 4

        second_round.append(i.text)
        text_to_be_returned["questions"][0].append(i.text)

        i.click()
        time.sleep(1)
        more = i.find_element_by_class_name('gy6Qzb')
        text_to_be_returned["questions"][1].append(more.text)
        # print(more.text)


def write_to_file():
    # to-do
    # remove all /n
    # extract url from second array and add to new third array
    # zip all 3 arrays to 1

    text_minus_escapes = [w.replace('\n', ' ') for w in text_to_be_returned["questions"][1]]

    dictionary = dict(zip(text_to_be_returned["questions"][0], text_minus_escapes))
    with open('result.json', 'w') as fp:
        json.dump(dictionary, fp)


if __name__ == '__main__':
    main()
