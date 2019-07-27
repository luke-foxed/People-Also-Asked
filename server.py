#!/usr/bin/env python
import os
import scraper
import sys
import waitress

from flask import Flask, render_template, jsonify
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/test")
def test():
    return 'testing'


@app.route('/scrape/<search_term>')
def scrape(search_term):
    items = (scraper.setup(search_term))
    return jsonify(items)


if __name__ == "__main__":
    # app.run(port=5000)
    waitress.serve(app, port=5000)
