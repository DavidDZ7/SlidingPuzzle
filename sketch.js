/*
p5.js script for Sliding Puzzle game
David Norman Diaz Estrada
https://github.com/DavidDZ7/SlidingPuzzle
August 2023
 */

backgroundColor='#444444';
cellColor="#aaaaaa"
rows=4;
cols=4;
cells=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createGrid(rows,cols)
}

function draw() {
  background(backgroundColor);
  //Show cells:
  for (const currentCell of cells) {
    currentCell.show();
  }
  
}

function createGrid(rows,cols){
  
  let cellWidth=windowWidth/cols;
  let cellHeight=windowHeight/rows;
  
  totalCells=rows*cols;
  numsSequence=generateRandomSequence(totalCells-1);
  console.log(numsSequence)
  let numIndex=0;
  for (row=0;row<rows;row++){
    for (col=0;col<cols;col++){
      if (numIndex==totalCells-1){break}//leave last cell empty
      num=numsSequence[numIndex];
      cells.push(new cell(row,col,cellWidth,cellHeight,num));
      numIndex+=1;
    }
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

class cell{
  constructor(row,col,cellWidth,cellHeight,num){
    this.width=cellWidth;
    this.height=cellHeight;
    this.num=num;
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
    textSize(30);
    let cellText = this.num.toString();
    let textWidth_ = textWidth(cellText);
    let textHeight_ = textAscent(cellText) + textDescent(cellText);
    //display num at the center of cell
    fill(20);
    text(cellText,this.x-textWidth_/2,this.y+textHeight_/4);

  }
  
}