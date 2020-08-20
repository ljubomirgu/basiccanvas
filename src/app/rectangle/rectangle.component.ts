import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css'],
})
export class RectangleComponent implements OnInit, AfterViewInit {

  colors = ['#00ffcc', '#3333cc', '#ccff33', '#cc0066'];
  i: number = 0;
  xStepsCounter = 0;
  yStepsCounter = 0;

  @ViewChild('canvasRectangle', { static: false }) canvasRectangle: ElementRef;

  public get canvas() : HTMLCanvasElement | null{
    return this.canvasRectangle != null ? this.canvasRectangle.nativeElement : null;
  }
  public get ctx() : any {
    return this.canvas != null ? this.canvas.getContext('2d') : null;
  }

  constructor() {}

  //drawing method from the beginning (only used in ngOnInit()):
  drawRectangle() {
    const canvas = <HTMLCanvasElement>document.getElementById('mdnRectangle');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 150, 100);

  }

  ngOnInit(): void {
   //this.drawRectangle();
  // this.paintRectangle();
  }

  ngAfterViewInit(){
   // this.paintRectangle();
  }

 moveAndDrawRectangleFull(event: MouseEvent){
   if(event.button === 0){
     this.leftClickPosition();
     this.paintRectangle();
   } else if(event.button === 2){
    this.rightClickPosition();
  } else{
    alert("That Mouse button is not supported!");
  }

 }

 paintRectangle(){
  //these two lines are needed to draw a rectangle of a given dimension:
   this.canvas.width = window.innerWidth;//
   this.canvas.height = window.innerHeight;//

   if(this.ctx != null){
    this.i = this.i < this.colors.length - 1 ? ++this.i : 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.colors[this.i];
    //this.ctx.scale(0.5, 0.5);
    this.ctx.fillRect(0 + (150 * this.xStepsCounter++), 0 + (100 * this.yStepsCounter), 150, 100);
    // console.log("PaintCanvas: ", this.canvas);
     console.log("PaintCtx: ", this.ctx);
   }
 }

 leftClickPosition(){
  const numberOfStepsX = Math.floor(this.canvas.width / 150);
  const numberOfStepsY = Math.floor(this.canvas.height / 100);

  if(this.xStepsCounter === numberOfStepsX){
    if(this.yStepsCounter === numberOfStepsY-1){
      this.xStepsCounter = 0;
      this.yStepsCounter = 0;
    } else {
      ++this.yStepsCounter;
      this.xStepsCounter = 0;
    }
  }
}


 rightClickPosition(){
  //these two lines are needed to draw a rectangle of a given dimension:
   this.canvas.width = window.innerWidth;//
   this.canvas.height = window.innerHeight;//

  const numberOfStepsX = Math.floor(this.canvas.width / 150);
  const numberOfStepsY = Math.floor(this.canvas.height / 100);

  if(this.ctx != null){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.i = this.i > 0 ? --this.i : this.colors.length - 1;
    this.ctx.fillStyle = this.colors[this.i];

    if(this.xStepsCounter === 1 || this.xStepsCounter === 0){
      if(this.yStepsCounter === 0){
       this.xStepsCounter = numberOfStepsX-1;
       this.yStepsCounter = numberOfStepsY-1;
       this.ctx.fillRect(0 + (150 * (this.xStepsCounter)), 0 + (100 * this.yStepsCounter), 150, 100);
        this.xStepsCounter++;
      } else {
       --this.yStepsCounter;
       this.xStepsCounter = numberOfStepsX-1;
       this.ctx.fillRect(0 + (150 * this.xStepsCounter), 0 + (100 * this.yStepsCounter), 150, 100);
       this.xStepsCounter++;
      }
    } else{
    this.ctx.fillRect(0 + (150 * (this.xStepsCounter-2)), 0 + (100 * this.yStepsCounter), 150, 100);
    this.xStepsCounter--;
    }
  }
}

}
