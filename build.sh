#!/bin/bash

if [ -e output ]; then
    rm -rf output
fi

OPTIMIZE="-o"
if [ "$1" == "debug" ]; then
    OPTIMIZE=""
fi

fis release -d output -c $OPTIMIZE

if [ "$1" == "debug" ]; then
    exit 0 
fi

cp output/src/localize.js ./release/localize.js

rm -rf output

