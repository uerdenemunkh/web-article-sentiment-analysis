# Web article sentiment analysis

## Usage
### Install prerequisite
`pip install -r requirements`
### Demo test
`python test.py`

## Bug fix (must!)
Go to `app.py`. Go into grequests import on line 1.

Change line 22 of `grequests.py`

`curious_george.patch_all(thread=False, select=False)` to `curious_george.patch_all()`.

Then run flask app.

### Running flask server locally
`flask run`
## Modifying
Write search related code in `google_search.py`.

Write ML related code in `model.py`.

Write web scarbing code in `web_parser.py`.

Write server code to `app.py`.

## Server endpoints

- GET http://127.0.0.1:5000/search ? query='your search keywords'
- POST http://127.0.0.1:5000/predict-url -> req {"url": "https://YourURL.com"} -> res 'json'
- POST http://127.0.0.1:5000/predict-text -> req {"text": "Your text. And again your text."} -> res 'json'

## ToDo
- React front
- Dashboard (single page analytics)
- Related site analyses results