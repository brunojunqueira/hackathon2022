import os
from flask import Flask, request, Response
from flask_cors import CORS

from dotenv import load_dotenv

from GoogleSearchAPI import search_api
from InternSearchAPI import intern_api
from UserSearchAPI import user_api

load_dotenv()

secret_key = os.getenv('DB_SECRET_KEY')

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'


@app.get('/v1/googlesearch')
def googlesearch_get():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    print(search_text)
    if len(search_text) == 0 or search_text == None:
        return Response("BAD_REQUEST: Check Information And Try Again", status=400, mimetype='text/plain')
    return search_api.search(search_text)

@app.post('/v1/googlesearch')
def googlesearch_post():
    search_object = request.get_json()
    search_api.recycle(search_object)
    return Response("OK", status=200, mimetype='text/plain')

@app.route('/v1/internsearch', methods=['GET'])
def internsearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    result = intern_api.search(search_text)
    return result

@app.route('/v1/usersearch', methods=['GET'])
def usersearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    result = user_api.search(search_text)
    return result

app.run()
