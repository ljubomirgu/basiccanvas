import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css'],
})
export class RectangleComponent implements OnInit {
  colors = ['#00ffcc', '#3333cc', '#ccff33', '#cc0066'];
  i: number = 0;
  actualX: number = 1;
  actualY: number = 0;

  @ViewChild('canvasRectangle', { static: false }) canvasRectangle: ElementRef;

  constructor() {}

  drawRectangle() {
    const canvas = <HTMLCanvasElement>document.getElementById('mdnRectangle');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 150, 100);
  }

  ngOnInit(): void {
    this.drawRectangle();
  }

  //color change function:
  changeColorOfRectangle() {
    const canvas = <HTMLCanvasElement>document.getElementById('mdnRectangle');
    const ctx = canvas.getContext('2d');

    this.i = this.i < this.colors.length ? ++this.i : 0;
    ctx.fillStyle = this.colors[this.i];
    ctx.fillRect(0, 0, 150, 100);
  }
  //"React verzija sa .getElementById():"
  //  draw(event: MouseEvent) {
  //  // console.log(event)
  //   const canvas = <HTMLCanvasElement> document.getElementById('mdnRectangle');
  //   const ctx = canvas.getContext('2d');

  //   if(event.button === 0){
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //   this.i= this.i < this.colors.length ? ++this.i : 0;

  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillStyle = this.colors[this.i];
  //   ctx.fillRect(0 + 150 * this.actualX++, 0 + this.actualY * 100, 150, 100);
  //   if(150 + 150 * this.actualX >= canvas.width){
  //     ++this.actualY;
  //     this.actualX=0;
  //   }

  // }  else{
  //   console.log("errorrrrr")
  // }

  // }

  //moving and changing color function:
  draw(event: MouseEvent) {
    // console.log(event)
    const canvas = this.canvasRectangle.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (event.button === 0) {
      this.i = this.i < this.colors.length - 1 ? ++this.i : 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = this.colors[this.i];
      ctx.fillRect(0 + 150 * this.actualX++, 0 + this.actualY * 100, 150, 100);
      if (150 + 150 * this.actualX >= canvas.width) {
        ++this.actualY;
        this.actualX = 0;
      }
    }
    if (event.button === 2) {
      this.i = this.i > 0 ? --this.i : this.colors.length - 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = this.colors[this.i];
      ctx.fillRect(0 + 150 * (--this.actualX - 1), 0 + this.actualY * 100, 150, 100);
      if (this.actualX <= 0) {
        --this.actualY;
        this.actualX = canvas.width/150;
      }
    }
    // else{
    //   alert("That Mouse button is not suported!");
    // }
  }
}
