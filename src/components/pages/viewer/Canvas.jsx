import React, {useRef, useEffect, Component} from 'react'

export default class Canvas extends Component {

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');

        var imageObj1 = new Image();
        imageObj1.src = 'http://localhost/images/homer2/txt99/Sorbonne_inv_2265.jpg'
        console.log(this.url)
        imageObj1.src = this.url;
        imageObj1.onload = function() {
            ctx.drawImage(imageObj1,0,0);
        }

    }


    render() {
        return (
            <canvas
                ref="canvas"
                // url="http://localhost/images/homer2/txt99/Sorbonne_inv_2265.jpg"
                width={1237}
                height={1469}
            />
        );
    }
};