#!/bin/bash

# start emulators and use local directory to store data, data is saved here on exit
GOOGLE_APPLICATION_CREDENTIALS="localServiceAccountKey.json" firebase emulators:start --import emulator-data/ --export-on-exit emulator-data/

