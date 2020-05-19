import API_ver0 as api
from flask import Flask

app = Flask(__name__)
socket_app = api.socketApp(app)

if __name__ == '__main__':
    socket_app.startThread()
    socket_app.startApp()