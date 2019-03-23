#!/bin/bash

declare -a productTypes=("knife" "pottery" "painting" "ww")

fp="src/data.js";

for i in ${productTypes[@]};do

    for(( j = 1; j < 13; j = j + 1));do

        echo -e "{ " >> $fp
        echo -e "product_id : '$i$j'," >> $fp
        echo -e "product_type: '$i'," >> $fp
        echo -e "title : ''," >> $fp
        echo -e "img : 'img/$i$j.jpg'," >> $fp
        echo -e "price : ''," >> $fp
        echo -e "company : ''," >> $fp
        echo -e "info : ''," >> $fp
        echo -e "inCart : false," >> $fp
        echo -e "count : 0," >> $fp
        echo -e "total : 0," >> $fp
        echo -e "id: ''," >> $fp
        echo -e "}," >> $fp
    done

done

