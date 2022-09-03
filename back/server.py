import os
from flask import request, Response
import flask
from dotenv import load_dotenv

from GoogleSearchAPI import search_api
from prisma import prisma_service

load_dotenv()

secret_key = os.getenv('DB_SECRET_KEY')

prisma_service.init()

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = secret_key

@app.get('/v1/googlesearch')
def googlesearch_get():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    if len(search_text) == 0:
        return Response("BAD_REQUEST: Check Information And Try Again", status=400, mimetype='text/plain')
    return search_api.search(search_text)

@app.post('/v1/googlesearch')
def googlesearch_post():
    return "Success"

@app.route('/v1/internsearch', methods=['GET'])
def internsearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    return search_api.search(search_text)

app.run()