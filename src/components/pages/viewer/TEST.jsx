import React, {useRef, useEffect, useState} from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function Test(props){
    // rect(135px,279px,167px,247px)
    // rect(173px,610px,211px,568px)
    // rect(184px,306px,216px,277px)
    // rect(182px,375px,210px,336px)


    return(
        <img style={{
            position: 'absolute',
            clip: 'rect(182px,375px,210px,336px)'}}
            src="http://localhost/images/homer2/txt213/POxy.2247.jpg"
        />
    );
}

export default Test;