Bluetooth Connection by DreamzCatcherz
=====
This is the code for the bluetooth connection between the ECE team's created controller and the Raspberry Pi.
It's job is to interpret the bluetooth controller's inputs and apply them to the created game and dashboard.
In this directory you will find 3 python files, ClientControl1, ClientControl2, and BluetoothServer. Note that
it will be impossible to run either client control with out one of the prototype controllers, I have included
them for code review. 


## Setup BluetoothServer and ClientControl:

Unfortunately to run this code for testing you will need a raspberry pi with built in bluetooth like the 
raspberry pi. Don't worry about running this if you do not have hardware present.

You will also need a way to send serial messages to server socket. If you do not have one, but do have a 
phone that can run apps, I would recommend the Serial Bluetooth Terminal app. 


## Bluetooth Server.py uses python 2.7 and use the following libraries:

bluetooth
keyboard 
time
thread

## ClientControl.py uses python 3 and the following libraries:

bluetooth
keyboard 
time

## For bluetooth on the terminal for the Pi try the following:
```
sudo apt-get update

sudo apt-get install python-pip python-dev ipython

sudo apt-get install bluetooth libbluetooth-dev

sudo pip install pybluez==0.22 this is for python 2.7, while 0.23 will work with python 3
````
## Next you need to configure the some files, use the following command:
```
sudo nano /etc/systemd/system/dbus-org.bluez.service
```
Add -C the the ExecStart line so it looks like the following line:

```
ExecStart=/usr/lib/bluetooth/bluetoothd -C
```
Finally add the following line directly below the ExecSart line:

```
ExecStartPost=/usr/bin/sdptool add SP
```
## Setting up the librarys 
For keyboard library use the following command:

```
pip install keyboard
```

Lastly for the thread library run:

```
pip install thread
```
For configuration with the ClientControl.py pip3 will help to install the libraries for python 3. 

## Now in terminal you can try to run the BluetoothServer with:
```
sudo python BluetoothServer.py
```
from here try and connect and try to send serial messages

## For ClientControl, you can run the code with in terminal with the following commands:
```
sudo python3 ClientControlX.py
```
with X being 1 or 2 depending on which controller you are trying to connect


## Usage:

For BluetoothSever.py, send serial messages to the server, these should appear in terminal,
and any accepted messages with cause the cooresponding key to be pressed. Since this key press is sent to 
what tab you are currently on, the effects of the keyboard press should be seen in the terminal or any tab you are in.

For ClientControl.py running the program with out the the protype controller will result in a connection timeout,
as the bluetooth connection will be unable to find it's target hardware. If the controller is present, the interacting with buttons
and the controllers joystick will cause the recieved serial string to change in the terminal. Similar ot the BluetoothServer.py the 
keyboard inputs will be sent to the current tab you are on. 




  
