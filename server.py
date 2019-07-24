#!/usr/bin/env python
import os
import scraper

from flask import Flask, render_template, json
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/test")
def test():
    return 'testing'


@app.route('/scrape/<search_term>')
def scrape(search_term):
    # javascript can't read list
    items = (scraper.setup(search_term))
    return json.htmlsafe_dumps(items)


if __name__ == "__main__":
    app.run(port=2000, debug=True)
