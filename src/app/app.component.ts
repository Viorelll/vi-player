import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { VioPlayerComponent } from 'vio-player';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VioPlayerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vi-player';

  songs: any = [
    {
      url: "../assets/songs/Ed Sheeran - Perfect (Official Music Video).mp3",
      name: "Perfect",
      artist: "Ed Sheeran",
      coverImageUrl: "../assets/img/song-cover.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/Dan Balan - Chica Bomb Official Video HD Hype Williams.mp3",
      name: "Chica Bomb",
      artist: "Dan Balan",
      coverImageUrl: "../assets/img/song-cover2.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/Miley Cyrus - Flowers (Official Video).mp3",
      name: "Flowers",
      artist: "Miley Cyrus",
      coverImageUrl: "../assets/img/song-cover3.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/Shawn Mendes, Camila Cabello - Señorita.mp3",
      name: "Señorita",
      artist: "Shawn Mendes, Camila Cabello",
      coverImageUrl: "../assets/img/song-cover4.jpg",
      genre: "Dance"
    },
    {
      url: "../assets/songs/Carla's Dreams - Imperfect  Official Video.mp3",
      name: "Imperfect",
      artist: "Carla's Dreams",
      coverImageUrl: "../assets/img/song-cover5.jpg",
      genre: "Rap"
    },
    {
      url: "../assets/songs/Rema, Selena Gomez - Calm Down (Official Music Video).mp3",
      name: "Calm Down",
      artist: "Rema, Selena Gomez",
      coverImageUrl: "../assets/img/song-cover.jpg",
      genre: "Hit"
    },
    {
      url: "../assets/songs/TONES AND I - DANCE MONKEY (OFFICIAL VIDEO).mp3",
      name: "DANCE MONKEY",
      artist: "TONES AND I",
      coverImageUrl: "../assets/img/song-cover2.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/Ed Sheeran - Shape of You (Official Music Video).mp3",
      name: "Shape of You",
      artist: "Ed Sheeran",
      coverImageUrl: "../assets/img/song-cover3.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/Martin Garrix - Forbidden Voices (Official Music Video).mp3",
      name: "Forbidden Voices",
      artist: "Martin Garrix",
      coverImageUrl: "../assets/img/song-cover4.jpg",
      genre: "HipPop"
    },
    {
      url: "../assets/songs/R3HAB & VINAI - How We Party (Official Music Video).mp3",
      name: "How We Party",
      artist: "R3HAB & VINAI",
      coverImageUrl: "../assets/img/song-cover5.jpg",
      genre: "Jazz"
    },
    {
      url: "../assets/songs/Inna - Hot (Official Video HD).mp3",
      name: "Hot",
      artist: "Inna",
      coverImageUrl: "../assets/img/song-cover.jpg",
      genre: "Piano"
    },
    {
      url: "../assets/songs/Irina Rimes - N-avem timp  Official Video.mp3",
      name: "N-avem timp",
      artist: "Irina Rimes",
      coverImageUrl: "../assets/img/song-cover2.jpg",
      genre: "Pop"
    },
    {
      url: "../assets/songs/INNA - Up.mp3",
      name: "Up",
      artist: "INNA",
      coverImageUrl: "../assets/img/song-cover3.jpg",
      genre: "Pop"
    },
  ];

  getFiles() {
    return of(this.songs);
  }
}
