import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <App />, document.getElementById('root')
);

let node;
let scale = 1;
let posX = 0;
let posY = 0;

export function setScale(s){
    scale = s;
}

let render = () => {
    node = document.querySelector('.can');

    if(node) {
        window.requestAnimationFrame(() => {
            let val = `translate3D(${posX}px, ${posY}px, 0px) scale(${scale})`;
            node.style.transform = val;
        })
    }
}

window.addEventListener('wheel', (e) => {

    document.body.style.zoom = 'normal';

    if (e.shiftKey === true) {

    }

    if (e.shiftKey) {
        e.preventDefault();
        scale -= e.deltaY * 0.001;
        posX = 0;
        posY = 0;
    }
    render();
});

window.addEventListener("gestureend", function (e) {
    e.preventDefault();
});
