import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { VioSongComponent } from './components/song/vio-song.component';
import { CurrentSong } from './types/vio-current-song.interface';
import { PlaylistState } from './types/vio-playlist-state.interface';
import { Song } from './types/vio-song.interface';
import { VioPlayerService } from './vio-player.service';

@Component({
  selector: 'vio-player',
  standalone: true,
  imports: [CommonModule, VioSongComponent],
  templateUrl: './vio-player.component.html',
  styleUrls: ['./vio-player.component.scss']
})
export class VioPlayerComponent implements OnInit, AfterViewChecked {

  @Input() songs: Array<Song> = [];

  currentSong: CurrentSong = { index: 0, song: undefined };

  state: PlaylistState = {
    songState: {
      playing: false,
      loading: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      volumeLevel: 0,
      prevVolumeLevel: 0,
      canplay: false,
      error: false
    },
    mode: 'shuffle',
    mute: false,
    showPlaylist: true
  }

  constructor(private vioPlayerService: VioPlayerService, private cd: ChangeDetectorRef ) {
    this.vioPlayerService.getState().subscribe(state => {
      this.state.songState = state;
    });
  }

  ngOnInit(): void {
    this.currentSong = {
      index: 0,
      song: this.songs[0]
    };
    this.vioPlayerService.playStream(this.currentSong.song!.url, false).subscribe();
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  onSliderChangeEnd(change: any) {
    this.vioPlayerService.seekTo(change.value);
  }

  onSliderVolumeChange(change: any) {
    this.state.songState.volumeLevel = change.value;

    if (change.value == 0) {
      this.state.mute = !this.state.mute;
    }

    this.state.songState.prevVolumeLevel = change.value;
    this.vioPlayerService.volumeTo(change.value);
  }

  getSongSlideLevel(value: number) {
    value = value < 50 ? value += 1 : value -= 1; //quick trick, workaround

    return value * 100 / this.state.songState.duration!;
  }

  onMute() {
    this.state.mute = !this.state.mute;

    if (this.state.mute) {
      this.state.songState.volumeLevel = 0;
    } else {
      this.state.songState.volumeLevel = this.state.songState.prevVolumeLevel;
    }

    this.vioPlayerService.volumeTo(this.state.songState.volumeLevel);
  }

  openSong(song: any, index: any) {
    this.currentSong = { index, song };
    this.vioPlayerService.stop();
    this.playStream(this.currentSong.song!.url);
  }

  playStream(url: string) {
    this.vioPlayerService.playStream(url).subscribe((events: any) => {
      // listening events here
      this.playNextSong(events);
    });
  }

  onPausePlay() {
    if (!this.state.songState.loading) {
      this.vioPlayerService.playStream(this.currentSong.song!.url).subscribe((events: any) => {
        // listening events here
        this.playNextSong(events);
      });
      this.state.songState.loading = true;
      return;
    }

    if (this.state.songState.loading && !this.state.songState.playing) {
      this.vioPlayerService.play()
        .subscribe(events => {
          // listening events here, undefined
        });
    }
    else {
      this.vioPlayerService.pause();
    }

    this.state.songState.playing = !this.state.songState.playing;
  }

  previous() {
    this.state.mute = false;
    const index = this.currentSong.index - 1;
    const song = this.songs[index];
    this.openSong(song, index);
  }

  next() {
    this.state.mute = false;
    const index = this.currentSong.index + 1;
    const song = this.songs[index];
    this.openSong(song, index);
  }

  playlist() {
    this.state.showPlaylist = !this.state.showPlaylist;
  }

  mode() {
    if (this.state.mode === 'shuffle') return this.state.mode = 'repeat'
    if (this.state.mode === 'repeat') return this.state.mode = 'only';
    if (this.state.mode === 'only') return this.state.mode = 'shuffle';

    return undefined;
  }

  isPlaying(): boolean {
    return this.state.songState.playing;
  }

  isFirstPlaying() {
    return this.currentSong.index === 0;
  }

  isLastPlaying() {
    return this.currentSong.index === this.songs.length - 1;
  }

  playNextSong(events: any) {
    if (events.type == 'ended') {
      switch (this.state.mode) {
        case 'shuffle':
          this.shuffleSongs();
          break;
        case 'repeat':
          this.repeatSongs();
          break;
        case 'only':
          this.repeatOnlySong();
          break;
        default:
          this.repeatSongs();
          break;
      }
    }
  }

  repeatOnlySong() {
    this.vioPlayerService.playStream(this.currentSong.song!.url).subscribe();
  }

  repeatSongs() {
    if (this.isLastPlaying()) {
      this.currentSong.index = 0;
    } else {
      this.currentSong.index = ++this.currentSong.index;
    }

    this.currentSong.song = this.songs[this.currentSong.index];
    this.vioPlayerService.playStream(this.currentSong.song.url).subscribe();
  }
  shuffleSongs() {
    const newSongIndex = Math.floor(Math.random() * this.songs.length);
    this.currentSong.index = newSongIndex;
    this.currentSong.song = this.songs[this.currentSong.index];
    this.vioPlayerService.playStream(this.currentSong.song.url).subscribe();
  }
}


