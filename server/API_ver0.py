import joblib
import numpy as np

from firebase import firebase
import datetime
import time

import threading

from flask import Flask
from flask_socketio import SocketIO



class socketApp(Flask):
    model = joblib.load('./bath4cases_RF.lib')
    label = ['empty', 'sink', 'toilet', 'shower']
    url = "https://sensors-real-time.firebaseio.com/"
    fb = firebase.FirebaseApplication(url, None)
    predictionThread = None
    socketio = None
    app = None

    def __init__(self, App):
        self.app = App
        self.app.config['SECRET_KEY'] = 'mySecret'
        self.socketio = SocketIO(self.app)
        
        def on_connect():
            print("On event: Backend Connected!")
        
        def on_message(msg):
            print('On event: Received Message: ' + msg)

        def on_disconnect():
            print('On event: Disconnected!')

        self.socketio.on_event('connect', on_connect, namespace='/event')
        self.socketio.on_event('message', on_message, namespace='/event')
        self.socketio.on_event('disconnect', on_disconnect, namespace='/event')

        
    def startApp(self):
        self.socketio.run(self.app, port=1000)

    def startThread(self):
        if self.predictionThread == None:
            self.predictionThread = threading.Thread(target=self.real_time_predict)
            # predictionThread.setDaemon(True)
            self.predictionThread.start()

    def real_time_predict(self):
        print('start')  
        interval = 3
        last_get = -1
        while True:
            stamp = datetime.datetime.now()
            sec = stamp.second
            if sec % interval == 0 and sec != last_get:
                last_get = sec
                time.sleep(1)
                path = stamp.strftime('%Y-%m-%d/') + str(stamp.hour) + '/' + str(stamp.minute) + '/'
                if sec == 0:
                    sec = 60
                    path = stamp.strftime('%Y-%m-%d/') + str(stamp.hour) + '/' + str(stamp.minute-1) + '/'
                seconds = str(sec-interval) + '-' + str(sec)
                print(path + seconds)
                sensors = self.fb.get(path, seconds)
                print(sensors)
                if sensors!= None and len(sensors.keys()) == 2:
                    sensors.get('NodeA').update(sensors.get('NodeB'))
                    sensors = sensors.get('NodeA')
                    X =  np.array([[sensors.get('PIR'), sensors.get('Sound'), sensors.get('Humidity'), sensors.get('Temperature'), sensors.get('Ultrasonic A'), sensors.get('Ultrasonic B'), sensors.get('Light')]])
                    result = self.label[self.model.predict(X)[0]]
                    print("Result:", result)        
                    self.socketio.emit('prediction',
                                    {
                                        'Time' : stamp.strftime("%H-%M-%S"), 
                                        'Result' : result
                                    },
                                    namespace = '/event')

   