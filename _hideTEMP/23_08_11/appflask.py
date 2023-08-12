from flask import Flask, send_from_directory, send_file, flash, request, session, redirect, url_for, render_template
from datetime import timedelta

#app = Flask(__name__,static_folder='.')
app = Flask(__name__, static_folder='', static_url_path='')
static_folder = '../pr1'; #'pr1'

@app.route("/")
def user():
    return send_from_directory(static_folder, 'indexlocal.html')


if __name__ == "__main__":
    app.run(debug=True, port=6001)
