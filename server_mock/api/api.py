from flask import Flask

import API_ver0 as api

app = Flask(__name__)
socker_app = api.socketApp(app)

@app.route('/', methods =[ 'GET' ])
def home():
	socket_app.startThread()
	return render_template('screen.js')

if __name__ == '__main__':
	socket_app.startApp()
