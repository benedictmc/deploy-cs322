import { Component, OnInit } from '@angular/core';
// import {Howl, Howler} from 'howler';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  openSnack(){
    
    this.snackBar.open("<INSERT LINK HERE>", 'Share', {
      duration: 5000,
    });

  }
  // playSound(){
  //   console.log("Button Clicked!")

  //   let sound1 = new Howl({
  //     src: ['../../assets/sound/adele.mp3']
  //   });
  //   let sound2 = new Howl({
  //     src: ['../../assets/sound/adele-background.mp3']
  //   });
  //     sound1.play()
  //     sound2.play()

  // }

}
