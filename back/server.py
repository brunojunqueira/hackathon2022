from flask import request
import flask
from GoogleSearchAPI import search_api

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/v1/googlesearch', methods=['GET'])
def googlesearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    return search_api.search(search_text)

@app.route('/v1/internsearch', methods=['GET'])
def internsearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    return search_api.search(search_text)

app.run()