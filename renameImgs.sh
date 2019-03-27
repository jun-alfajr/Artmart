#!/bin/bash

imgsDir="./public/img/"

declare -a productTypes=("knife" "pottery" "painting" "ww")
declare -a newProductTypes=("knives" "pottery" "paintings" "wood-work")

    for(( i = 0; i < 4; i = i + 1));do
        for(( j = 0; j < 12; j = j + 1));do
            mv $imgsDir${productTypes[$i]}$((j+1)).jpg $imgsDir${newProductTypes[$i]}$((j+1)).jpg
        done;
    done;
