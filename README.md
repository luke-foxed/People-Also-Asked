# People-Also-Asked

A SEO tool which scrapes the 'people also asked' (PAA) section of the Google search results page. 

---

## 1. Introduction
The app works through entering a search term and scraping the PAA from the resulting page. For each PPA section, the search phrase, text snippet and article URL are all scraped. The scraped search phrase will become the nnew search term for the next itteration of PPA scraping.

What results is four parent questions from the initial search, and 4 child questions nested within each of the 4 parents - totalling to 16 related questions (sometimes less depending on the number of PPA items returned by Google).

Up to 200 searches can be cached on the user's device, meaning previosuly searched queries will load instanty rather than beginning the scraping process again.


## 2. Setup

To run the app locally, clone the repo and run the following commands: 

`npm install` then `python server/server.py`

Once the server is running, navigate to http://127.0.0.1:5000

### 2.1 Running on Docker

To run the app on docker, run the following commands:

`docker build -t people-also-asked .` then `docker run -p 5000:5000 people-also-asked`

Once the docker container has created the server, navigate to http://127.0.0.1:5000 if using the docker desktop client. If you are using a docker machine, nagivate to `<docker-machine ip>:5000`.

## 3. Made With

- React
- Flask
- Semantic UI 
- Webpack
- Flask
- Selenium
