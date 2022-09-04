import os
from flask import Flask, request, Response, send_file
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


@app.get('/v1/googlesearch')
def googlesearch_get():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    if len(search_text) == 0 or search_text == None:
        return Response("BAD_REQUEST: Check Information And Try Again", status=400, mimetype='text/plain')
    return search_api.search(search_text)

@app.post('/v1/googlesearch')
def googlesearch_post():
    search_object = request.get_json()
    search_api.recycle(search_object)
    return Response("OK", status=200, mimetype='text/plain')

@app.get('/v1/internsearch')
def internsearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    if len(search_text) == 0 or search_text == None:
        return Response("BAD_REQUEST: Check Information And Try Again", status=400, mimetype='text/plain')
    result = intern_api.search(search_text)
    if result == None or len(result) == 0:
        return Response("NOT_FOUND: Nada encontrado no nosso sistema", status=404, mimetype='text/plain')
    return result

@app.get('/v1/usersearch')
def usersearch():
    query_parameters = request.args
    search_text = query_parameters.get('search')
    if len(search_text) == 0 or search_text == None:
        return Response("BAD_REQUEST: Check Information And Try Again", status=400, mimetype='text/plain')
    result = user_api.search(search_text)
    if result == None or len(result) == 0:
        return Response("NOT_FOUND: Nada encontrado no nosso sistema", status=404, mimetype='text/plain')
    return result

@app.route('/', defaults={'req_path': ''})
@app.route('/<path:req_path>')
def dir_listing(req_path):
    BASE_DIR = os.path.dirname(os.path.realpath(__file__)) + "\\public"

    # Joining the base and the requested path
    abs_path = os.path.join(BASE_DIR, req_path)

    # Return 404 if path doesn't exist
    if not os.path.exists(abs_path):
        return Response("NOT_FOUND: Nada encontrado no nosso sistema", status=404, mimetype='text/plain')

    # Check if path is a file and serve
    if os.path.isfile(abs_path):
        return send_file(abs_path)

app.run(host='0.0.0.0', port=5000, debug=True)
