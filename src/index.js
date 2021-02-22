import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

let mouseIsDown = false;
let initMouseX = null;
let initMouseY = null;

const onMouseDown = (e) => {
    console.log(document.getElementsByClassName('cube')[0].style["transform"]);
    let x = e.clientX;
    let y = e.clientY;
    initMouseX = x;
    initMouseY = y;
    mouseIsDown = true;
}

const onMouseMoving = (e) => {
    let cubes = document.getElementsByClassName('cube');
    for (let cube of cubes) {
        if (mouseIsDown === true) {
            let x = e.clientX;
            let y = e.clientY;
            let xRotate = (initMouseX + x).toString();
            let yRotate = (initMouseY + y).toString();
            let rotatePhrase = `rotateY(${xRotate}deg) rotateX(${yRotate}deg)`;
            cube.style.transform = rotatePhrase;
        }
    }    
}

const onMouseUp = () => {
    mouseIsDown = false;
    initMouseX = null;
    initMouseY = null;
}

const changeDistance = (e) => {
  let wrapper = document.getElementById('wrapper');
  let distance = e.target.value;
  let newDistance = `${distance}px`;
  wrapper.style.perspective = newDistance;
}


let isSliderClicked = false;

const mouseDownSlider = () => {
  isSliderClicked = true;
  document.getElementsByTagName('HTML')[0].removeEventListener('mousedown', onMouseDown);
  document.getElementsByTagName('HTML')[0].removeEventListener('mousemove', onMouseMoving);
  document.getElementsByTagName('HTML')[0].removeEventListener('mouseup', onMouseUp);
}

const mouseUpSlider = () => {
  isSliderClicked = false;
  document.getElementsByTagName('HTML')[0].addEventListener('mousedown', onMouseDown);
  document.getElementsByTagName('HTML')[0].addEventListener('mousemove', onMouseMoving);
  document.getElementsByTagName('HTML')[0].addEventListener('mouseup', onMouseUp);
}

let id = null;
const adjustSize = (e) => {
  console.log()
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (isSliderClicked !== true) {
      clearInterval(id);
    } else {
      let wrapper = document.getElementById('wrapper');
      let distance = e.target.value;
      let newDistance = `${distance}px`;
      wrapper.style.perspective = newDistance;
    }
  }
} 

// document.getElementById('slider').addEventListener('change', changeDistance);
document.getElementById('slider').addEventListener('mousedown', mouseDownSlider);
document.getElementById('slider').addEventListener('mouseup', mouseUpSlider);
document.getElementById('slider').addEventListener('mousemove', adjustSize);
document.getElementById('slider').addEventListener('click', changeDistance);
document.getElementsByTagName('HTML')[0].addEventListener('mousedown', onMouseDown);
document.getElementsByTagName('HTML')[0].addEventListener('mousemove', onMouseMoving);
document.getElementsByTagName('HTML')[0].addEventListener('mouseup', onMouseUp);
document.getElementsByTagName('HTML')[0].addEventListener('touchstart', onMouseDown);
document.getElementsByTagName('HTML')[0].addEventListener('touchmove', onMouseMoving);
document.getElementsByTagName('HTML')[0].addEventListener('touchend', onMouseUp);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
