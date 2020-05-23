import time
import random
from datetime import datetime

import threading

from flask import Flask, request
from flask_socketio import SocketIO

label = ['empty', 'sink', 'toilet', 'shower']

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('connect', namespace='/event')
def connect():
    print('client connected', request.sid)


@socketio.on('disconnect', namespace='/event')
def disconnect():
    print('client disconnected', request.sid)


def mock_predict():
    while True:
        time.sleep(3)
        stamp = datetime.now()
        socketio.emit('prediction', {
            'Time': stamp.strftime('%Y-%m-%d %H:%M:%S'),
            'Result': random.choice(label)
        }, namespace='/event')


prediction_thread = None


def start_thread():
    global prediction_thread
    if prediction_thread is None:
        prediction_thread = threading.Thread(target=mock_predict)
        prediction_thread.start()
        print('thread started')


if __name__ == '__main__':
    try:
        start_thread()
        socketio.run(app, port=5000)
    except Exception as e:
        print("\n Execption occurs while starting the socketio server", str(e))
