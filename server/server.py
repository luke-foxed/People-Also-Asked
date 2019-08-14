#!/usr/bin/env python
import os
import scraper
import sys
from selenium.common.exceptions import NoSuchElementException

# import waitress

from flask import Flask, render_template, jsonify
app = Flask(__name__, template_folder='../templates',
            static_folder='../static')


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/scrape/<search_term>')
def scrape(search_term):
    try:
        items = scraper.setup(search_term)
        return jsonify(items)

    except NoSuchElementException as err:
        return err


if __name__ == "__main__":
    app.run(port=5000)
    # waitress.serve(app, port=5000)
