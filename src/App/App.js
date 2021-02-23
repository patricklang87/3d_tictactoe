import React from 'react';
import './App.css';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.updateCube = this.updateCube.bind(this);
    this.checkFoWinner = this.checkForWinner.bind(this);
    this.acknowledgeWinner = this.acknowledgeWinner.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      cubeState: [[[null, null, null], [null, null, null], [null, null, null]],
                  [[null, null, null], [null, null, null], [null, null, null]],
                  [[null, null, null], [null, null, null], [null, null, null]]],
      player1IsNext: true
    }
  }

  acknowledgeWinner() {
    let winner;
    if (this.state.player1IsNext) winner = "player1";
          else winner = "player2";
          document.getElementsByTagName('BODY')[0].style.backgroundColor = (winner === "player1") ? "green" : "hotpink";
          return winner;
  }

  checkForWinner() {
    //within single board
    let cube = this.state.cubeState;
    let winner = null;
    // within a single row
    for (let board of cube) {
      for (let row of board) {
          if (row[0] != null && row[0] === row[1] && row[0] === row[2]) {
            winner = this.acknowledgeWinner();
            return winner;;
          }
      } 
      //diagonal within a board
      if ((board[0][0] != null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) || (board[0][2] != null && board[0][2] === board[1][1] && board[0][2] === board[2][0])) {
        winner = this.acknowledgeWinner();
        return winner;
      }
      // row down a single board
      for (let x = 0; x < 3; x++) {
        if (board[0][x] != null && board[0][x] === board[1][x] && board[0][x] === board[2][x]) {
          winner = this.acknowledgeWinner();
          return winner;
        } 
      }
      
    }
    // row across 3 boards
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (cube[0][y][x] != null && cube[0][y][x] === cube[1][y][x] && cube[0][y][x] === cube[2][y][x]) {
          winner = this.acknowledgeWinner();
          return winner;
        }
      }
    }  
    for (let x = 0; x < 3; x++) {
      if ((cube[0][0][x] != null && cube[0][0][x] === cube[1][1][x] && cube[0][0][x] === cube[2][2][x]) || (cube[2][0][x] != null && cube[2][0][x] === cube[1][1][x] && cube[2][0][x] === cube[0][2][x])) {
        winner = this.acknowledgeWinner();
        return winner;
      }
      if ((cube[0][x][0] != null && cube[0][x][0] === cube[1][x][1] && cube[0][x][0] === cube[2][x][2]) || (cube[2][x][0] != null && cube[2][x][0] === cube[1][x][1] && cube[2][x][0] === cube[0][x][2])) {
        winner = this.acknowledgeWinner();
        return winner;
      }
      if ((cube[0][0][0] != null && cube[0][0][0] === cube[1][1][1] && cube[0][0][0] === cube[2][2][2]) || (cube[0][0][2] != null && cube[0][0][2] === cube[1][1][1] && cube[0][0][2] === cube[2][2][0]) || (cube[2][0][0] != null && cube[2][0][0] === cube[1][1][1] && cube[2][0][0] === cube[0][2][2]) || (cube[2][0][2] != null && cube[2][0][2] === cube[1][1][1] && cube[2][0][0] === cube[0][2][0]) )  {
        winner = this.acknowledgeWinner();
        return winner;
      }
    }
    
  }

  reset() {
    this.setState({
        cubeState: [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]],
        player1IsNext: true
    });
    document.getElementsByTagName('BODY').style.backgroundColor = "white";
  } 

  updateCube(z, y, x) {
    console.log("oldCube: ", this.state.cubeState);
    console.log(z, y, x);
    let newCube = this.state.cubeState;
    newCube[z][y][x] = (this.state.player1IsNext) ? "player1" : "player2";
    console.log("newCube: ", newCube);
    this.checkFoWinner();
    return newCube;
  }

  onClick(z, y, x) {
    this.setState({
      cubeState: this.updateCube(z, y, x),
      player1IsNext: (this.state.player1IsNext === true) ? false : true
    });
  }

  
  render() {

    let cube = [];
    for (let x = 0; x < 3; x++) {
      let id = `board` + x;
      cube.push(
          <Board key={x} id={id} handleClick={this.onClick} currentCube={this.state.cubeState} player1IsNext={this.state.player1IsNext} />
      );
    }



    return ( 
      <div> 
        <div className="wrapper" id="wrapper" >
          <div className="cube">
            {cube}
          </div>
        </div>
        <div className="slider" >
          <input type="range" min="250" max="1500" />
        </div>
        <footer>
          <p>A project by <a href="https://patricklang87.github.io/portfolio/">Patrick Lang</a></p>
          <p>&copy; 2021</p>
        </footer>
      </div>
    );
  
  }
  
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.createSides = this.createSides.bind(this);
  }
  
  onClick(e) {
    let tile = e.target.parentNode;
    let tileZ = tile.id[4];
    let tileY = tile.id[5];
    let tileX = tile.id[6];
    console.log("onClick values: ", e.target, e.target.parentNode, tileZ, tileY, tileX);
    if (this.props.currentCube[tileZ][tileY][tileX] == null) {
      this.props.handleClick(tileZ, tileY, tileX);
    }
  }

  colorTiles() {
    let cubeState = this.props.currentCube;
    let tiles = document.getElementsByClassName('deepTile');
    for (let tile of tiles) {
      let tileId = tile.id;
      let tileZ = tileId[4];
      let tileY = tileId[5];
      let tileX = tileId[6];
      if (cubeState[tileZ][tileY][tileX] != null) {
        let newColor;
        if (cubeState[tileZ][tileY][tileX] === "player1") newColor = "limegreen";
        if (cubeState[tileZ][tileY][tileX] === "player2") newColor = "hotpink";
        let sides = tile.childNodes;
        for (let child of sides) {
          child.style.backgroundColor = newColor;
        }
      }
    }
  }

  createSides(idkey) {
    let sides = [];
    for (let x = 0; x < 6; x++) {
      let sideId = `${idkey}${x}`;
      let side = <div className="side" key={sideId} ></div>;
      sides.push(side);
    }
    return sides;
  }


  render() {
    let board = [];
    for (let y = 0; y < 3; y++) {
      let row = [];
      for (let x = 0; x < 3; x++) {
      let key = `tile${this.props.id[5]}${y}${x}`; 
      let sides = this.createSides(key);
      this.colorTiles();
      row.push(<div className="deepTile" key={key} id={key} onClick={this.onClick}>
        {sides}
      </div>);
      }
      board.push(row);
    }

    return ( 
      <div className="board"> 
        {board}
      </div>
    );
  }
}




// let mouseIsDown = false;
// let initMouseX = null;
// let initMouseY = null;

// const onMouseDown = (e) => {
//     console.log(document.getElementsByClassName('cube')[0].style["transform"]);
//     let x = e.clientX;
//     let y = e.clientY;
//     initMouseX = x;
//     initMouseY = y;
//     mouseIsDown = true;
// }

// const onMouseMoving = (e) => {
//     let cubes = document.getElementsByClassName('cube');
//     for (let cube of cubes) {
//         if (mouseIsDown === true) {
//             let x = e.clientX;
//             let y = e.clientY;
//             let xRotate = (initMouseX + x).toString();
//             let yRotate = (initMouseY + y).toString();
//             let rotatePhrase = `rotateY(${xRotate}deg) rotateX(${yRotate}deg)`;
//             cube.style.transform = rotatePhrase;
//         }
//     }    
// }

// const onMouseUp = () => {
//     mouseIsDown = false;
//     initMouseX = null;
//     initMouseY = null;
// }

// const changeDistance = (e) => {
//   let wrapper = document.getElementById('wrapper');
//   let distance = e.target.value;
//   let newDistance = `${distance}px`;
//   wrapper.style.perspective = newDistance;
// }


// let isSliderClicked = false;

// const mouseDownSlider = () => {
//   isSliderClicked = true;
//   document.getElementsByTagName('HTML')[0].removeEventListener('mousedown', onMouseDown);
//   document.getElementsByTagName('HTML')[0].removeEventListener('mousemove', onMouseMoving);
//   document.getElementsByTagName('HTML')[0].removeEventListener('mouseup', onMouseUp);
// }

// const mouseUpSlider = () => {
//   isSliderClicked = false;
//   document.getElementsByTagName('HTML')[0].addEventListener('mousedown', onMouseDown);
//   document.getElementsByTagName('HTML')[0].addEventListener('mousemove', onMouseMoving);
//   document.getElementsByTagName('HTML')[0].addEventListener('mouseup', onMouseUp);
// }

// let id = null;
// const adjustSize = (e) => {
//   console.log()
//   clearInterval(id);
//   id = setInterval(frame, 5);
//   function frame() {
//     if (isSliderClicked !== true) {
//       clearInterval(id);
//     } else {
//       let wrapper = document.getElementById('wrapper');
//       let distance = e.target.value;
//       let newDistance = `${distance}px`;
//       wrapper.style.perspective = newDistance;
//     }
//   }
// } 



// // document.getElementById('slider').addEventListener('change', changeDistance);
// document.getElementById('slider').addEventListener('mousedown', mouseDownSlider);
// document.getElementById('slider').addEventListener('mouseup', mouseUpSlider);
// document.getElementById('slider').addEventListener('mousemove', adjustSize);
// document.getElementById('slider').addEventListener('click', changeDistance);
// document.getElementsByTagName('HTML')[0].addEventListener('mousedown', onMouseDown);
// document.getElementsByTagName('HTML')[0].addEventListener('mousemove', onMouseMoving);
// document.getElementsByTagName('HTML')[0].addEventListener('mouseup', onMouseUp);
// document.getElementsByTagName('HTML')[0].addEventListener('touchstart', onMouseDown);
// document.getElementsByTagName('HTML')[0].addEventListener('touchmove', onMouseMoving);
// document.getElementsByTagName('HTML')[0].addEventListener('touchend', onMouseUp);



export default App;
