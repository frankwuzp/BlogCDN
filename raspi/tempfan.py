#!/usr/bin/python2
import sys
import time
try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")


def cpu_temp():
    with open("/sys/class/thermal/thermal_zone0/temp", 'r') as f:
        return float(f.read())/1000


def main():
    channel = 14
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

    # open air fan first
    GPIO.setup(channel, GPIO.OUT, initial=GPIO.LOW)
    is_close = False
    while True:
        temp = cpu_temp()
        if is_close == True:
            if temp > 50.0: # 高于 50℃ 自动开启风扇
                print(time.ctime(), temp, 'open air fan')
                GPIO.output(channel, GPIO.LOW)
                is_close = False
        else:
            if temp < 45.0: # 低于45℃ 风扇自动关闭
                print(time.ctime(), temp, 'close air fan')
                GPIO.output(channel, GPIO.HIGH)
                is_close = True

        time.sleep(15.0)
        #print time.ctime(), temp, is_close


if __name__ == '__main__':
    main()
