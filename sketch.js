/*
p5.js script for Sliding Puzzle game
David Norman Diaz Estrada
https://github.com/DavidDZ7/SlidingPuzzle
August 2023
 */

backgroundColor='#444444';
cellColor="#aaaaaa"
rows=3;
cols=3;
grid=[];
emptyCell=[rows-1,cols-1]//initialize position of empty cell

function setup() {
  createCanvas(windowWidth, windowHeight);
  createGrid(rows,cols)
  console.log("Grid:",grid)

}

function draw() {
  background(backgroundColor);
  //Show grid:
  //for (const currentCell of grid) {
  //  if (currentCell.empty==false){currentCell.show();}
  //}
  for (let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){      
      if (grid[row][col].empty==false){grid[row][col].show();}
    }
  }
  
  if (checkWin()){
    console.log("Completed!");
    ShowWin();
    noLoop();
  }
}

function createGrid(rows,cols){
  
  let cellWidth=windowWidth/cols;
  let cellHeight=windowHeight/rows;
  
  totalgrid=rows*cols;
  numsSequence=generateRandomSequence(totalgrid-1);
  console.log("Nums sequence: ",numsSequence)
  let numIndex=0;
  for (let row=0;row<rows;row++){
    gridRow = [];
    for (let col=0;col<cols;col++){      
      if (numIndex==totalgrid-1){//leave last cell empty
        empty=true;
        num=null;
      }
      else{
        empty=false;
        num=numsSequence[numIndex];
      }
      gridRow.push(new cell(row,col,cellWidth,cellHeight,num,empty));
      numIndex+=1;
    }
    grid.push(gridRow);
  }
  
}

function generateRandomSequence(n) {
  let sequence = [];

  // Generate a sequence of numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    sequence.push(i);
  }

  // Shuffle the sequence using the Fisher-Yates algorithm
  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]]; // Swap elements
  }

  return sequence;
}

function mouseClicked(){
  position=identifyMouseInGrid(mouseX,mouseY)
  console.log("grid[position]:",position)
  //if (position!=null){ console.log(grid[position[0]][position[1]])}
  
  //check if the user clicked on a cell that allows a valid movement (distance to empty cell must me strictly 1)
  if (position!=null && position!=emptyCell && ( (Math.abs(position[0]-emptyCell[0]) + Math.abs(position[1]-emptyCell[1])) == 1 )){
    console.log("valid movement")
    //update empty cell and swap with clicked cell:
    grid[emptyCell[0]][emptyCell[1]].empty=false;
    grid[emptyCell[0]][emptyCell[1]].num=grid[position[0]][position[1]].num;

    grid[position[0]][position[1]].empty=true;
    grid[position[0]][position[1]].num=null;

    emptyCell=position
  }
}

function identifyMouseInGrid(mouseX,mouseY){
  //loop through the grid and check which cell was clicked:
  for (let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){      
      if (Math.abs(mouseX-grid[row][col].x)<grid[row][col].width/2 && Math.abs(mouseY-grid[row][col].y)<grid[row][col].height/2)
        return [row,col]
    }
  }
  return null 
}

function checkWin(){
  let num=1
  for (let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
      if (num>rows*cols-1){break}      
      if (grid[row][col].num!=num) {return false}
      num++;
    }
  }
  return true;
}


function ShowWin(){
  let winText="YOU WON!";
  strokeWeight(0);
  textSize(cells[0][0].height/2);
  let textWidth_ = textWidth(winText);
  let textHeight_ = textAscent(winText) + textDescent(winText);
  //display text at the center of window
  fill(20);
  text(winText,x=windowWidth/2-textWidth_/2,y=windowHeight/2-textHeight_/2);
}

class cell{
  constructor(row,col,cellWidth,cellHeight,num,empty){
    this.empty=empty;//boolean to check of cell is empty
    this.num=num;
    this.row=row;
    this.col=col;
    this.width=cellWidth;
    this.height=cellHeight;    
    this.y=row*this.height+this.height/2;
    this.x=col*this.width+this.width/2;
    this.radius=10;
  }

  show(){
    fill(cellColor)
    strokeWeight(3);
    stroke(backgroundColor)
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.radius);
    //Show num inside cell:
    strokeWeight(0);
    textSize(this.height/4);
    let cellText = this.num.toString();
    let textWidth_ = textWidth(cellText);
    let textHeight_ = textAscent(cellText) + textDescent(cellText);
    //display num at the center of cell
    fill(20);
    text(cellText,this.x-textWidth_/2,this.y+textHeight_/4);

  }
  
}