from flask import request
import flask
from SearchApi import search_api

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/v1/googlesearch', methods=['GET'])
def search():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    print(search_text)
    return search_api.search(search_text)

app.run()