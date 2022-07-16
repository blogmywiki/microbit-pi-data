# microbit-pi-data
Log micro:bit sensor data as a CSV on a Raspberry Pi and serve it as a graph in a webpage

## What you need

- A BBC micro:bit
- Any old Raspberry Pi with internet connectivity. (I used an old model B with a 'lite' version of the Raspberry Pi OS that has no GUI.)
- A micro USB cable to connect the micro:bit to the Pi
- Er, that's it

## How to make it work

![blocks in MakeCode](microbit-serial-logger-1line-string-smol.png)

Flash the HEX file above onto the BBC micro:bit. If you want to edit the program, you can drag and drop the HEX file on to the [MakeCode editor](https://makecode.microbit.org/#editor) or paste in the text in the .JS version of the file, also included in this repo.
Every minute, or when you press button A, this program writes a string to the USB serial port comprising two numbers, the temperature and the light level reading separated by a colon. That's all it does. The block redirecting serial to USB probably isn't needed but is there for clarity.

Plug the micro:bit into the Raspberry Pi's USB socket.

![micro:bit and old Raspberry Pi](IMG_3857-smol.JPG)

On the Raspberry Pi, add the test.csv file and in the same folder add serial_read.py.

Add the index.html file to the same folder. 

Run the Python program by typing `python3 serial_read.py` at a terminal console prompt. If you get an error saying the port is busy, reboot the Pi and try again. If you get an unpacking error, just type `python3 serial_read.py` again. You should see data printed in the serial console every minute, or when you press button A. Note that the name of your micro:bit's serial port may be different - for example, mine just changed to /dev/ttyAMA0 from /dev/ttyACM0. If you navigate to `cd /dev/` and type `ls -m` you should see it listed, look for something similar and edit serial_read.py accordingly.

This program checks once a second for serial data incoming on the serial port. It splits the incoming string into two bits of data, temperature and light level, and writes it with a timestamp to the test.csv file. The timestamp is truncated just to show the date, hours and minutes.

Now to make the data appear in a webpage on your local network, for example the wi-fi network in your house, open another terminal window on the Pi. (I connect remotely using SSH from a laptop, which I recommend as you'll need two consoles open). You'll need to know the IP address or network device name of the Pi for the next step - my Pi is called 'ceefax' but I could just as easily have used its local IP address (something like 192.168.0.23). You can find the IP address by looking on your wi-fi router's control panel or by typing `ifconfig` and looking on the second line.

Now to start a simple webserver in Python, navigate to the directory where your files are saved and type `python3 -m http.server 8888` at the terminal prompt. (You can use port numbers other than 8888).

Then, on a computer on the same network, open a browser and navigate to http://ceefax:8888/ where 'ceefax' is the network name or IP address of your Pi, and 8888 is the port number. And you should see your data in a lovely interactive graph. The HTML page uses plotly.js so you can isolate individual lines, zoom in and out, all sorts!

![screenshot of webpage](screenshot.png)

## Improvements

You can customise this to log any data you like. You could use the micro:bit connnected to the Pi to receive sensor data by radio from micro:bits in other room or outdoors. I'll probably add an external DS18B20 temperature sensor to get more accurate temperature data.

An obvious improvement is to make the Python script and webserver run automatically at start up, rather than manually in console windows on my laptop, but this is a good start and proof of concept I think.

I might also see if I can send the CSV file to my real webserver by FTP, and then serve up a data page on the actual interwebs.
