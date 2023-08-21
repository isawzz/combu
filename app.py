from flask import (
    Flask,
    send_from_directory,
    send_file,
    flash,
    request,
    session,
    redirect,
    url_for,
    render_template,
)
from datetime import timedelta

# app = Flask(__name__,static_folder='.')
app = Flask(__name__, static_url_path="", static_folder="")
from flask_cors import CORS

CORS(app)
static_folder = "pr1"


@app.route("/")
def _get():
    return send_from_directory(static_folder, "index.html")


@app.route("/post", methods=["POST"])  # post data contains settings to be added (!)
def _post():
    data = request.get_json(force=True)
    return data


# from googletrans import Translator #NEIN!!!
# translator = Translator()
# x = translator.translate("veritas lux mea", src="la", dest="fr")

# import argostranslate.package #NEIN!!!
# import argostranslate.translate
# from_code = "es"
# to_code = "en"
# # Download and install Argos Translate package
# # *** ==> UNCOMMENT IF FIRST TIME IN A LANGUAGE ***
# argostranslate.package.update_package_index()
# available_packages = argostranslate.package.get_available_packages()
# package_to_install = next(filter(lambda x: x.from_code == from_code and x.to_code == to_code, available_packages))
# argostranslate.package.install_from_path(package_to_install.download())
# # Translate
# translatedText = argostranslate.translate.translate("soy me", from_code, to_code)
# print(translatedText)

# from translate import Translator #NEIN!!!
# languages = ['fr','it','es','ge','ru']
# text='das ist nicht schlecht!' #input('enter text')
# translator = Translator(provider='libre',from_lang='ge',to_lang='es')
# result = translator.translate(text)
# print(result)

from googletrans import Translator #NEIN!!!
t=Translator()
text='das ist nicht schlecht!' #input('enter text')
# zh fr en de it es ja la ru cy
result = t.translate(text,dest='cy')
print(result)

# from pocketsphinx import LiveSpeech  #NEIN!!!
# speech = LiveSpeech(lm=False, keyphrase='forward', kws_threshold=1e-20)
# for phrase in speech:
#     print(phrase.segments(detailed=True))

# from gtts import gTTS #JA geht aber mist
# import os
# mytext = 'no lo se exactamente'
# language = 'es'
# myobj = gTTS(text=mytext, lang=language, slow=False)
# myobj.save("welcome.mp3")
# os.system("start welcome.mp3")

# import pyttsx3
# engine = pyttsx3.init()
# engine.say("I will speak this text")
# engine.runAndWait()

# print('___________________')
# import pyttsx3

# engine = pyttsx3.init()
# voices = engine.getProperty('voices')

# for voice in voices:
#     print("ID:", voice.id)
#     print("Name:", voice.name)
#     print("Languages:", voice.languages)
#     print("----")


if __name__ == "__main__":
    app.run(debug=True, port=6001)
