import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import * as Parallax from 'parallax-js';

declare var Parallax: any;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    // const scene = document.getElementById('scene')
    // const parallaxInstance = new Parallax(scene, {
    //   relativeInput: true,
    //   hoverOnly: true
    // })
  }

  ngAfterContentInit(){
    const scene = document.getElementById('scene')
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true
    })
  }


}
