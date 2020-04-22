import bluetooth 
import keyboard
import time
import thread 

#This code is the server based code that works with out hardware integration from the ECE team
#was eventually changed to be client based due to integration with the ECE teams software

#A defined function that is called during the thread when a new client connects to the server
def ListenEXE(client_socket,address):
    client_socket.send("red");            #Changes the LED color on the connected controller
    while 1:
       Recdata = client_socket.recv(1024) #Size of the message it can recieve 
       #client_socket.send("red");
       print("Recived: %s" % (Recdata))
       ListDat = list(Recdata)            #Since the controllers will eventaully send a string I use this to split the message into an array
       #print("Im a Test for list() %s" % ListDat[0])
        
       if(Recdata == "w"):        #The following If statements all function the same 
          keyboard.press('w')     #looks through the recieved data if it is the correct value
          time.sleep(.25)         #That key will be pressed on the keyboard for  set amount of time 
          keyboard.release('w')   #and the action will be sent to the terminal, the key input is sent
          print("move up")        #to the tab you are currently on
       if(Recdata == "s"):
          print("move down")
          keyboard.press('s')
          time.sleep(.25)
          keyboard.release('s')
       if(Recdata == "a"):
          print("move left")
          keyboard.press('a')
          time.sleep(.25)
          keyboard.release('a')
       if(Recdata == "d"):
          print("move right")
          keyboard.press('d')
          time.sleep(.25)
          keyboard.release('d')
       if(Recdata == "e"):
          keyboard.press('e')
          time.sleep(.25)
          keyboard.release('e')
          print ("attack")

       #function split, this ends the player one controller the following if are purely for breaking out 
       if(Recdata == "t"):     #of the loop and closing the socket , the ' ' was a command orignally for player 1
          keyboard.press(' ')
          time.sleep(.25)
          keyboard.release(' ')
          print("inventory")
       if(Recdata == "q"):
           print("exiting program")
           client_socket.close()
           #server_socket.close()
           break
       if(Recdata == "kill"):
           print("exiting program")
           client_socket.close()
           server_socket.close()
           break
       #PLAYER 2 SPLIT this is the player 2 inputs, they work the same when compared to that of the player  
       #one inputs, for this it is assumed each controller sends the correct data over the conncetion
       if(Recdata == "i"):
          keyboard.press('i')
          time.sleep(.25)
          keyboard.release('i')
          print("move up P2")
       if(Recdata == "k"):
          print("move down P2")
          keyboard.press('k')
          time.sleep(.25)
          keyboard.release('k')
       if(Recdata == "j"):
          print("move left P2")
          keyboard.press('j')
          time.sleep(.25)
          keyboard.release('j')
       if(Recdata == "l"):
          print("move right P2")
          keyboard.press('l')
          time.sleep(.25)
          keyboard.release('l')
       if(Recdata == "o"):
          keyboard.press('o')
          time.sleep(.25)
          keyboard.release('o')
          print ("attack player 2")

server_socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)   # sets the socket to be RFCOMM for serial connections over bluetooth
portnum = 1
server_socket.bind(("",portnum))  #Binds the socket to a specific port, in this case it will be 1
server_socket.listen(2)           #specfies the maximum amount of connections the bluetooth server

#server_socket.connect(("24:6F:28:A9:60:0A",1))
#address = "24:6F:28:A9:60:0A"
while 1:                                        #This loop runs infinitly accepting connections and then sending them to the function above 
   client_socket,address = server_socket.accept() #assuming there is enough room from the listen function
   print("Connected With ",(address))
   thread.start_new_thread(ListenEXE,(client_socket,address)) #The thread function

server_socket.close()

