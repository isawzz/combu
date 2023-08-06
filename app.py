from flask import Flask, flash, request, session, redirect, url_for, render_template
from datetime import timedelta

app = Flask(__name__, static_folder='base')
app.secret_key = "sdfhjwk5hj34k5hkjdh drt vdflfs;"
app.permanent_session_lifetime = timedelta(days=10)

#region login logout user routes
@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        session["username"] = username
        session.permanent = True
        flash(f"Login successful!", "info")
        return redirect(url_for("user"))
    elif "username" in session:
        flash(f"Already logged in!", "info")
        return redirect(url_for("user"))
    else:
        return render_template("index.html", username="")


@app.route("/logout")
def logout():
    if "username" in session:
        username = session["username"]
        flash(f"{username} logged out!", "info")
    session.pop("username", None)
    if "answer" in session: session.pop("answer", None)
    if "query" in session: session.pop("query", None)
    return redirect(url_for("login"))


@app.route("/")
@app.route("/user")
def user():
    if "username" in session:
        username = session["username"]
        answer = session["answer"] if "answer" in session else ''
        query = session["query"] if "query" in session else ''
        # return f"<h1>{username}</h1>"
        return render_template("index.html", username=username, answer=answer, query=query)
    else:
        flash(f"You are not logged in!", "info")
        return redirect(url_for("login"))
#endregion login logout user routes

#region ask
import os
import openai
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv()) #loads .env file
openai.api_key = os.environ["API_KEY"]

def get_completion(prompt,model='gpt-3.5-turbo'):
    messages = [{'role':'user','content':prompt}]
    response = openai.ChatCompletion.create(model=model,messages=messages,temperature=0)
    return response.choices[0].message["content"]
def ask(prompt): return get_completion(prompt)
def rephrase(text, tone='polite'):
  p=f'rephrase "{text}" in a style that is {tone}'
  return ask(p)

@app.route("/ask", methods=["POST", "GET"])
def askroute():
    if request.method == "POST":
        query = request.form["query"]
        session["query"] = query
        session["answer"] = ask(query)
        return redirect(url_for("user"))
    else:
        session.pop("answer", None)
        return redirect(url_for("user",answer='you did not ask any question!'))
#endregion ask


if __name__ == "__main__":
    app.run(debug=True, port=6001)
