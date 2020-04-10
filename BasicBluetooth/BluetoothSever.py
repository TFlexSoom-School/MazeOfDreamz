import bluetooth
import keyboard
import time
import thread 

def ListenEXE(client_socket,address):
    client_socket.send("red");
    while 1:
       Recdata = client_socket.recv(1024)
       client_socket.send("red");
       print"Recived: %s" % Recdata
       ListDat = list(Recdata)
       print "Im a Test for list() %s" % ListDat[0]
       if(Recdata == "up"):
          keyboard.press('w')
          time.sleep(.25)
          keyboard.release('w')
          print "move up"
       if(Recdata == "down"):
          print "move down"
          keyboard.press('s')
          time.sleep(.25)
          keyboard.release('s')
       if(Recdata == "left"):
          print "move left"
          keyboard.press('a')
          time.sleep(.25)
          keyboard.release('a')
       if(Recdata == "right"):
          print "move right"
          keyboard.press('d')
          time.sleep(.25)
          keyboard.release('d')
       if(Recdata == "a"):
          keyboard.press(' ')
          time.sleep(.25)
          keyboard.release(' ')
          print "attack"
       if(Recdata == "e"):
          keyboard.press('e')
          time.sleep(.25)
          keyboard.release('e')
          print "inventory"
       if(Recdata == "q"):
           print "exiting program"
           client_socket.close()
           #server_socket.close()
           break
       if(Recdata == "kill"):
           print "exiting program"
           client_socket.close()
           server_socket.close()
           break
       #PLAYER 2 SPLIT

       if(Recdata == "i"):
          keyboard.press('i')
          time.sleep(.25)
          keyboard.release('i')
          print "move up P2"
       if(Recdata == "k"):
          print "move down P2"
          keyboard.press('k')
          time.sleep(.25)
          keyboard.release('k')
       if(Recdata == "j"):
          print "move left P2"
          keyboard.press('j')
          time.sleep(.25)
          keyboard.release('j')
       if(Recdata == "l"):
          print "move right P2"
          keyboard.press('l')
          time.sleep(.25)
          keyboard.release('l')

server_socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
portnum = 1
server_socket.bind(("",portnum))
server_socket.listen(2)

#server_socket.connect(("24:6F:28:A9:60:0A",1))
#address = "24:6F:28:A9:60:0A"
while 1:
   client_socket,address = server_socket.accept()
   print "Connected With ", address
   thread.start_new_thread(ListenEXE,(client_socket,address))

server_socket.close()

