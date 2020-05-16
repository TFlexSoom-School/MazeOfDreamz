Bluetooth Connection by DreamzCatcherz
=====
This is the code for the bluetooth connection between the ECE team's created controller and the Raspberry Pi.
It's job is to interpret the bluetooth controller's inputs and apply them to the created game and dashboard.
In this directory you will find 3 python files, ClientControl1, ClientControl2, and BluetoothServer. Note that
it will be impossible to run either client control with out one of the prototype controllers, I have included
them for code review. Please look to ClientControl2 for comments as their content is mostly the same. Dont hesitate
to ask question if you have them


## Setup BluetoothServer:

Unfortuantly to run this code for testing you will need a raspberry pi with built in bluetooth like the 
raspberry pi. Don't worry about running this if you do not have the hardware.

You will also need a way to send serial messages to server socket. If you do not have one, but do have a 
phone that can run apps, I would recommend the Serial Bluetooth Terminal app. 


## Bluetooth Server.py uses python 2.7 and the following libraries:

bluetooth
keyboard
time
thread

## For bluetooth on the terminal for the Pi try the following:

sudo apt-get update

sudo apt-get install python-pip python-dev ipython

sudo apt-get install bluetooth libbluetooth-dev

sudo pip install pybluez==0.22   //this is for python 2.7, 0.23 is for python 3

## Next you need to configure the some files, use the following command:

sudo nano /etc/systemd/system/dbus-org.bluez.service

Add -C the the ExecStart line so it looks like the following line:


ExecStart=/usr/lib/bluetooth/bluetoothd -C

Finally add the following line direclty below the ExecSart line:


ExecStartPost=/usr/bin/sdptool add SP


For keyboard library use the following command:


pip install keyboard


Lastly for the thread library run:


pip install thread

#3 Now in terminal you can try to run the BluetoothServer with:

sudo python BluetoothServer

from here try and connect and try to send serial messages


## Testing:

For BluetoothSever, it's testing is simple. Send serial messages to the server, these should appear in terminal,
and any accepted messages with cause the cooresponding key to be pressed. Since this key press is sent to 
what tab you are currently on, the effects of the keyboard press should be seen in the terminal or any tab you are in.
For example you should be able to see the key board presses in a search bar. you can also try and connect two serial
messagers, and send mesages at the same time. Connecting a third will result in the thrid connection being rejected.
Other testing could involve mutiple inputs at the same time, or specfic combinations to try and crash the program.




  
