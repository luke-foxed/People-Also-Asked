import json
import sys
import time
import re

from flask.json import jsonify
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = webdriver.ChromeOptions()

chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1366x768")
chrome_options.add_argument("--no-sandbox")


scraper_data = {
    "group1": {
        "questions": []
    },
    "group2": {
        "questions": []
    },
}

search_term = 'where to sell a car online'

browser = webdriver.Chrome(ChromeDriverManager().install(), 0, chrome_options)


def construct_data(search, more, url, header, parent):

    data_constructor = {
        "search": search,
        "more": more,
        "article_url": url,
        "article_header": header,
        "parent": parent,
        "children": []
    }

    return data_constructor


def populate_first():
    start_scraper(search_term, 1)


def populate_latter():

    for i in range(1, 2):
        for j in range(len(scraper_data["group%s" % i]["questions"])):
            search_term = scraper_data["group%s" % i]["questions"][j]['search']
            start_scraper(search_term, i+1)


def main():

    populate_first()
    populate_latter()
    format_results()


def start_scraper(search_term, depth):

    div_counter = 1

    browser.get('https://www.google.com/search?q=' + search_term)

    time.sleep(3)

    questions = browser.find_elements_by_class_name('related-question-pair')

    for i in questions[:4]:  # only take the first 4

        question = i.text
        parent = search_term
        i.click()
        time.sleep(1)

        more = browser.find_element_by_xpath(
            "//div[%s]/g-accordion-expander[1]/div[2]/div[1]/div[1]/div[1]" % div_counter).text

        more = more.replace('\n', ' ')

        article = browser.find_element_by_xpath(
            "//div[%s]/g-accordion-expander[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/a[1]/h3[1]" % div_counter)

        article_header = article.text
        article_url = article.find_element_by_xpath('..').get_attribute('href')

        try:
            article_url = article.find_element_by_xpath(
                '..').get_attribute('href')
        except:
            # some snippets have no url?
            article_url = ''

        data = construct_data(question, more, article_url, article_header, parent)

        scraper_data["group%s" % depth]["questions"].append(data)

        div_counter += 1


def format_results():

    for i in range(len(scraper_data['group1']['questions'])):
        for j in range(len(scraper_data['group2']['questions'])):
            if(scraper_data['group1']['questions'][i]['search'] == scraper_data['group2']['questions'][j]['parent']):
                scraper_data['group1']['questions'][i]['children'].append(
                    scraper_data['group2']['questions'][j])

    del scraper_data['group2']

    with open('result.json', 'w') as fp:
        json.dump(scraper_data, fp)

    return scraper_data


if __name__ == '__main__':
    main()
