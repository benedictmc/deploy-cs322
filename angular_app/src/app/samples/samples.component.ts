import { Component, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {
  artist :string = ''
  ipUrl = "https://localhost:5000/"
  list: string[]
  lyrics = null;
  backing = null;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.getSamples().subscribe(data=>{
      this.list = data
      console.log(this.list)
    })
  }

  select(artist){
    console.log(artist)
    this.artist = artist
    this.playSound(artist)

  }
  
  playSound(artist){
    let file = 'Mooncatcher'
    if (artist == 'kanye_west'){
      file = 'Nightsky'
    }
    console.log("Button Clicked!")
    console.log('assets/sound/samples/'+artist+'.mp3')
    this.lyrics = new Howl({
      src: ['assets/sound/samples/'+artist+'.mp3'],
    });
    this.backing = new Howl({
      src: ['assets/sound/'+file+'.mp3']
    });
      this.lyrics.play()
      this.backing.volume(0.5)
      this.backing.play()

  }
  getSamples (): Observable<any[]> {
    let url = this.ipUrl+'API/get-samples'
    return this.http.get<any[]>(url)
      .pipe(
        tap(_ => _)
      );
  }

  stop(){
    this.lyrics.stop()
    this.backing.stop()
  }

}