import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import {Howl, Howler} from 'howler';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: string[]
  arrayName: string
  map = new Map<string, string>(); 
  results: Boolean = false
  artistFocus: string = ''
  sampleFocus: string = ''
  lyricError: Boolean = false
  loaded: string = '';
  current_data: string;
  ipUrl = "http://localhost:5000/"
  fin_artist: string = ''
  constructor(public http: HttpClient, private scroll: NgxAutoScrollModule) { }
  
  ngOnInit() {
    this.map.set("Kanye West", "this.kanyeSamples");
    this.map.set("The Beatles", "this.beatlesSamples");
    console.log("Loading page...")
    this.getArtists().subscribe(data=>{
      this.list = data
    })
  }
  ngAfterViewInit(){
  }

  changeArtist(artist, event, kanye){
    this.artistFocus = artist
  }


  postLyrics() {
    this.current_data = " "
    this.loaded = 'loading'
    let sample = this.sampleFocus
    let artist = this.artistFocus
    console.log('Generate button clicked with artist and sample', this.sampleFocus, sample)


    let url = this.ipUrl+ 'API/post-artists'
    this.http.post(url, {
        "artist" : artist,
        "sample" : sample
      }).subscribe(
      data => {
          console.log("POST Request is successful ", data);
          // this.current_data = data['result']
          let requestId = data['id']
          this.queryRequest(requestId)
          setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          }, 10);
          console.log("Request made");

      this.fin_artist = artist
      },
      error => {
          console.log("Error", error);
          this.loaded = 'done'
          this.lyricError = true;
      }
    );     
    console.log("Posting lyrics....")
  }

  queryRequest(requestId){
    let url = this.ipUrl+'API/check-status?id='+requestId
    console.log("called get request", url)
    const source = interval(2000);
    const timer$ = timer(200000); 
    const example = source.pipe(takeUntil(timer$));
    const subscribe = example.subscribe(val => {
      this.http.get(url).subscribe(data =>{
        console.log(data)
        if(data['status'] == 'in progress'){
          console.log("Not done")
        }
        else if(data['status'] == 'failed'){
          console.log("Failed")
          this.loaded = 'done'
          this.lyricError = true;
          subscribe.unsubscribe()
        }
        else{
          console.log("Done!")
          console.log(data['result'])
          this.loaded = "done"
          this.current_data = data['result']
          subscribe.unsubscribe()
        }
      })
    })
  }


  getArtists (): Observable<any[]> {
    let url = this.ipUrl+'API/artists'
    return this.http.get<any[]>(url)
      .pipe(
        tap(_ => _),
        catchError(this.handleError('getArtists', []))
      );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  playSound(){
    console.log("Button Clicked!")

    let sound1 = new Howl({
      src: ['../../assets/sound/adele.mp3']
    });
    let sound2 = new Howl({
      src: ['../../assets/sound/adele-background.mp3']
    });
      sound1.play()
      sound2.volume(0.35)
      sound2.play()

  }
}