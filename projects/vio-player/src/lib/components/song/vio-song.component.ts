import { Component, Input } from '@angular/core';
import { Song } from '../../types/vio-song.interface';

@Component({
  selector: 'vio-song',
  standalone: true,
  imports: [],
  templateUrl: './vio-song.component.html',
  styleUrls: ['./vio-song.component.scss']
})
export class VioSongComponent {

  @Input() song?: Song;
  @Input() index: number = 0;

  getSongNumber = () => this.index + 1;
}
