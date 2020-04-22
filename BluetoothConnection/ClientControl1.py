import bluetooth      #check the other file for the comments, the files are nearly identicle
import keyboard       #the just connect to different ESP's
import time
#import thread 


Csocket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
#MYESP
#server_socket.connect(("24:6F:28:A9:60:0A",1))
#address = "24:6F:28:A9:60:0A"
#NICKESP

Csocket.connect(("C8:2B:96:9D:AC:26",1))
#NESP2
#Csocket.connect(("C8:2B:96:9C:E0:4E",1))

#address = "24:6F:28:A9:60:0A"

Csocket.send("red")

c = 0

while 1:
    #if(c == 30):
    #   Csocket.send("A")
    #c = c + 1
    # rl (encoder) xxx yyy (analog) bcdefgh (Buttons) XXXX YYYY ZZZZ (accelrometer) #    Csocket.settimeout(10)
    Recdata = Csocket.recv(16448)

    A = len(Recdata)
    #print(A)
    #if(A != 16):
    #   print("bad strlen")
    #   donothing = 1
    if(A == 16):
       Recdata = str(Recdata,'utf-8')
       LD = list(Recdata)
       print("Recived:" ,(Recdata))
       print("Im a Test for list() ", (int(LD[0])))
       print("good strlen %d" % (A))
       
       #analog stick conversion
       
       if(LD[2] != '\x00' or LD[3] != '\x00' or LD[4] != '\x00'):

          XintL = [LD[2],LD[3],LD[4]]
          #XintL = list(map(int,XintL))
          print( "X Coordinates %s" % (XintL))
          Xs = "".join(map(str,XintL)) 
          Xint = int(Xs)
         
       if(LD[5] != '\x00' or LD[6] != '\x00' or LD[7] != '\x00'):
          print("%s" % (LD[5]))
          YintL = [LD[5],LD[6],LD[7]]
          #YintL = list(map(int,YintL))
          print("Y Coordinates %s" % (YintL))
          Ys = "".join(map(str,YintL))
          Yint = int(Ys)

       
    #Player 1 MOVE
       if(Yint > 180):
          keyboard.press('w')
          print("move up")
       if(Yint < 90):
          print("move down")
          keyboard.press('s')
       if(Xint < 90):
          print("move left")
          keyboard.press('a')
       if(Xint > 180):
          print("move right")
          keyboard.press('d')
       if(LD[13] == "1"):
          keyboard.press(' ')
          print("attack/jump")
       if(LD[10] == "1"):
          keyboard.press('e')
          print("inventory")
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

       if(LD[12]=="1" and LD[13]=="1" and LD[10]=="1"):
           Csocket.send("blue");
           print("exiting program")
           Csocket.close()
           break 

	#RELEASE SECTION

       #if(LD[13] == "1"):
          #keyboard.release(' ')

       time.sleep(.08)
       
       if(Yint > 180):
          keyboard.release('w')
       if(Yint < 90):
          keyboard.release('s')
       if(Xint < 90):
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
          


Csocket.close()

#sys.stdout.flush()
#sys.stdout.close()
