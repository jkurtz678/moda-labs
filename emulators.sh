#!/bin/bash

# start emulators and use local directory to store data, data is saved here on exit
firebase emulators:start --import emulator-data/ --export-on-exit emulator-data/

