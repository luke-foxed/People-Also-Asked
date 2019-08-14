FROM python:3.6

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

# Download Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome
RUN apt-get update && apt-get -y install google-chrome-stable

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt

WORKDIR /app/server

EXPOSE 5000

ENV FLASK_APP=server.py
CMD ["flask", "run", "--host", "0.0.0.0"]
