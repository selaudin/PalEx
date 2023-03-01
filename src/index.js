import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
    ,
  document.getElementById('root')
);

let node, nodee;
let rotation = 0;
let gestureStartRotation = 0;
let gestureStartScale = 0;
let scale = 1;
let posX = 0;
let posY = 0;
let startX;
let startY;

export function setScale(s){
    scale = s;
}

let render = () => {
    node = document.querySelector('.can');

    nodee = document.querySelector('#canvasLayout');
    // console.log(nodee);

    if(node) {
        // node.addEventListener('mouseover', function (e) {
        //     alert('hello world');
        // });

        window.requestAnimationFrame(() => {
            let val = `translate3D(${posX}px, ${posY}px, 0px) scale(${scale})`;
            node.style.transform = val;
        })
    }
}

window.addEventListener('wheel', (e) => {
    // e.preventDefault();
    // console.clear();
    // console.log(e);

    document.body.style.zoom = 'normal';

    let BB=document.querySelector('.can');

    // console.log(e.clientX,e.clientY);
    // console.log(e.movementX,e.offsetY);
    // let ratio = e.offsetX/e.offsetY;
    // console.log(ratio);

    if (e.shiftKey == true) {
        // alert('disabling zooming');
    }

    if (e.shiftKey) {
        e.preventDefault();
        scale -= e.deltaY * 0.001;
        posX = 0;
        posY = 0;
    }
    render();
});


// window.addEventListener("gesturestart", function (e) {
//     e.preventDefault();
//     startX = e.pageX - posX;
//     startY = e.pageY - posY;
//     gestureStartRotation = rotation;
//     gestureStartScale = scale;
// });

// window.addEventListener("gesturechange", function (e) {
//     e.preventDefault();

//     rotation = gestureStartRotation + e.rotation;
//     scale = gestureStartScale * e.scale;

//     posX = e.pageX - startX;
//     posY = e.pageY - startY;

//     render();

// })

window.addEventListener("gestureend", function (e) {
    e.preventDefault();
});
