import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject, from } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";
import { SongStreamState } from "./types/vio-song-stream-state.interface";
import { PlaylistState } from "./types/vio-playlist-state.interface";

@Injectable({
  providedIn: 'root'
})
export class VioPlayerService {

  state: PlaylistState = {
    songState: {
      playing: false,
      loading: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      volumeLevel: 70,
      prevVolumeLevel: 70,
      canplay: false,
      error: false
    },
    mode: 'shuffle',
    mute: false,
    showPlaylist: true
  }

  private stop$ = new Subject<void>();
  private audioObj = new Audio();
  private stateChange: BehaviorSubject<SongStreamState> = new BehaviorSubject(
    this.state.songState
  );

  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];

  getState(): Observable<SongStreamState> {
    return this.stateChange.asObservable();
  }

  playStream(url: string, shouldPlay: boolean = true) {
    return this.streamObservable(url, shouldPlay).pipe(takeUntil(this.stop$));
  }

  play() : Observable<void> {
    return from(this.audioObj.play());
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds: any) {
    this.audioObj.currentTime = seconds;
  }

  volumeTo(volume: any) {
    this.audioObj.volume = volume / 100;
  }

  formatTime(time: number, format: string = "mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.songState.duration = this.audioObj.duration;
        this.state.songState.readableDuration = this.formatTime(this.state.songState.duration);
        this.state.songState.canplay = true;
        break;
      case "playing":
        this.state.songState.playing = true;
        break;
      case "pause":
        this.state.songState.playing = false;
        break;
      case "timeupdate":
        this.state.songState.currentTime = this.audioObj.currentTime;
        this.state.songState.readableCurrentTime = this.formatTime(
          this.state.songState.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.songState.error = true;
        break;
    }
    this.stateChange.next(this.state.songState);
  }

  private resetState() {
    this.state.songState = {
      playing: false,
      loading: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      volumeLevel: 70,
      prevVolumeLevel: 70,
      canplay: false,
      error: false
    };
  }


  private streamObservable(url: any, shouldPlay: boolean) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.volume = this.state.songState.volumeLevel! / 100;
      this.audioObj.load();

      if (shouldPlay) {
        this.audioObj.play();
      }

      const handler = (event: Event) => {

        this.updateStateEvents(event);

        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }
}
