# Web article sentiment analysis

## Usage (Backend)
`cd server`

### Install prerequisite
`pip install -r requirements`

### Bug fix (must!)
Go to `server/app.py`. Go into `import grequests` on line 1. (Press CTRL + Left-Click)

Modify line 22 of `grequests.py`

`curious_george.patch_all(thread=False, select=False)` to `curious_george.patch_all()`.

Then run flask app.

### Running flask server locally
`flask run`
### Modifying
Write search related code in `google_search.py`.

Write ML related code in `model.py`.

Write web crawling code in `web_parser.py`.

Write server code to `app.py`.

### Server endpoints

- GET http://127.0.0.1:5000/search ? query=string & news=boolean & count=integer
- POST http://127.0.0.1:5000/predict-url -> req {"url": "https://YourURL.com"} -> res 'json'
- POST http://127.0.0.1:5000/predict-text -> req {"text": "Your text. And again your text..."} -> res 'json'

## Usage (Frontend)
`cd webapp`

### Install prerequisite
`npm install`

### Running vite dev server locally
`npm run dev`

## TODO
- SLCPS (Search Load Crawl Predict Show)