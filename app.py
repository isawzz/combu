from flask import Flask, send_from_directory, send_file, flash, request, session, redirect, url_for, render_template
from datetime import timedelta

#app = Flask(__name__,static_folder='.')
app = Flask(__name__, static_url_path='', static_folder='')
from flask_cors import CORS; CORS(app)
static_folder = 'pr1'

@app.route("/")
def _get():
    return send_from_directory(static_folder, 'index.html')

@app.route('/post', methods=['POST'])  # post data contains settings to be added (!)
def _post():
	data = request.get_json(force=True)
	return data


if __name__ == "__main__":
    app.run(debug=True, port=6001)
