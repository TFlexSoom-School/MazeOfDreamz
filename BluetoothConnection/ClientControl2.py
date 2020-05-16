import bluetooth
import keyboard
import time
#import thread 

#This is the code that makes use of the hardware provided by the ECE team
#This one happens to be the second player controller. Each ClientControl file
#is for a specific controller. 


Csocket = bluetooth.BluetoothSocket(bluetooth.RFCOMM) # sets up the socket to be RFCOMM serial over bluetooth
#MYESP
#server_socket.connect(("24:6F:28:A9:60:0A",1)) 
#address = "24:6F:28:A9:60:0A"
#NESP

#Csocket.connect(("C8:2B:96:9D:AC:26",1)) # the ESP's bluetooth MAC address, connects to the ESP
#NESP2
Csocket.connect(("C8:2B:96:9C:E0:4E",1))  #The other ESP is the palyer one controller

#address = "24:6F:28:A9:60:0A"

Csocket.send("blue")                    #This change sthe LED light on the controller to be blue on the controller

c = 0

while 1: # the while loop that runs after a successful connection
    #if(c == 30):
    #   Csocket.send("A")
    #c = c + 1
    # rl (encoder) xxx yyy (analog) bcdefgh (Buttons) XXXX YYYY ZZZZ (accelrometer) #    Csocket.settimeout(10)
    Recdata = Csocket.recv(16448) # the buffer is large due to the rate at which the ESP sends its data
                                  # at the moment the ESP does not send accelrometer
    A = len(Recdata)             
    #print(A)
    #if(A != 16):
    #   print("bad strlen")
    #   donothing = 1
    if(A == 16):                      #We want to make sure the string is only a specfic length
       Recdata = str(Recdata,'utf-8') #if not we reject the string, reject any strings that do not   
       LD = list(Recdata)             #have the correct format
       print("Recived:" ,(Recdata))                 #Prints to console of debugging purposes
       print("Im a Test for list() ", (int(LD[0])))
       print("good strlen %d" % (A))
       
       #analog stick conversion
       
       if(LD[2] != '\x00' or LD[3] != '\x00' or LD[4] != '\x00'): #There is a sending bug with the ESP 32 at the moment 
                                                                  #there is a change a hex null value appears on the string
          XintL = [LD[2],LD[3],LD[4]]                             #if this happens then program will crash, this section
          #XintL = list(map(int,XintL))                           #checks the X and Y coordinates for that null
          print( "X Coordinates %s" % (XintL))                    #since the value only appears in the X and Y coordinates of
          Xs = "".join(map(str,XintL))                            #the set string.
          Xint = int(Xs)
         
       if(LD[5] != '\x00' or LD[6] != '\x00' or LD[7] != '\x00'):
          print("%s" % (LD[5]))
          YintL = [LD[5],LD[6],LD[7]]
          #YintL = list(map(int,YintL))
          print("Y Coordinates %s" % (YintL))
          Ys = "".join(map(str,YintL))
          Yint = int(Ys)

       
    #Player movement and controls
       if(Yint > 180):             #This gets the values from teh string and checks them against the if statements
          keyboard.press('w')      #If the correct values are found then it will press the keyboard key sending the 
          print("move up")         #input to the tab it is currently on. In this case, unlike the sever code,
       if(Yint == 90):             #we can do mutiple inputs at once as the buttons are not realeased, which will be shown below. 
          print("move down")
          keyboard.press('s')
       if(Xint == 90):
          print("move left")
          keyboard.press('a')
       if(Xint > 180):
          print("move right")
          keyboard.press('d')
       if(LD[13] == "1"):
          keyboard.press(' ')
          print("inventory")
       if(LD[10] == "1"):
          keyboard.press('e')
          print("attack")
       if(LD[12] == "1"):
          keyboard.press('Esc')
          print("menu/esc")
       if(LD[8] == "1"):
          keyboard.press('Enter')
          print("OPTION/ECT1")
       if(LD[11] == "1"):
          keyboard.press('2')
          print("OPTION/ECT2")

    #SPECIALS CASES

       if(LD[12]=="1" and LD[13]=="1" and LD[10]=="1"): # This is simply to close the socket, ending the program
           Csocket.send("blue");                        
           print("exiting program")
           Csocket.close()
           break 

	#RELEASE SECTION

       #if(LD[13] == "1"):
          #keyboard.release(' ')

       time.sleep(.08)                  #some games require a certain amount of time the button must be pressed
                                        #down before the input actually registers
       if(Yint > 180):                  
          keyboard.release('w')         #This checks the value again, which then releases the keyboard key,
       if(Yint == 90):                  #these are the same if statements as above, which is why this release works.
          keyboard.release('s')
       if(Xint == 90):
          keyboard.release('a')
       if(Xint > 180):
          keyboard.release('d')
       if(LD[13] == "1"):
          keyboard.release(' ')
       if(LD[10] == "1"):
          keyboard.release('e')
       if(LD[12] == "1"):
          keyboard.release('Esc')
       if(LD[8] == "1"):
          keyboard.release('Enter')
       if(LD[11] == "1"):
          keyboard.release('2')
          


Csocket.close()                      #This closes the socket just in case the controllers inputs gets out of the while loop

#sys.stdout.flush()
#sys.stdout.close()
