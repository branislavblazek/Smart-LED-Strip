# Smart-LED-Strip
Control LED Strip connected to Raspberry Pi via web app!

# Setup

## 1. Raspberry Pi

### 1.a. System

Recommend is `Raspbian Lite`, but works with any version of `Raspbian`. `Ubuntu` should also works but haven't tested yet. Boot selected item at SD card & insert into Raspberry Pi. 

### 1.b. System settings

```bash
  sudo raspi-config
```
There enable SSH, set up internet connection (Country, SSID, password), maybe hostname if you want.
Test yours connection with:
```bash
  hostname -I
  >> 192.168.0.xyz
  ping google.com
  >> something...
```
Set static IP (to prevent auto-assign IP for RPi)
```bash
  sudo nano /etc/dhcpcd.conf
  >> (nano editor)
  interface wlan0
  static ip_address=192.168.0.222/24
  static routers=192.168.0.1
  static domain_name_servers=192.168.0.1
  >>
  sudo reboot
```
### 1.c. Install library for USB controlling
```bash
  sudo apt-get update && sudo apt-get -y upgrade
  sudo apt-get install gcc
  sudo apt-get install make
  sudo apt-get install libusb-1.0
  sudo apt-get install git
  git clone git://github.com/mvp/uhubctl
  cd uhubctl
  make
```
### 1.d. Test if it works
```bash
   sudo ./uhubctl -l 1-1 -p 2 -a off
```
