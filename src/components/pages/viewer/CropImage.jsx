import React, {useRef, useEffect, useState} from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function CropImage(props){
    let url = 'http://localhost/'+props.url;
    const [crop, setCrop] = useState(props.crop);
    console.log(url, crop);

    return(
        <ReactCrop crop={crop} onChange={c => setCrop(c)}>
            <img src={url} />
        </ReactCrop>
    );
}

export default CropImage;