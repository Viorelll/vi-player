import { SongStreamState } from "./vio-song-stream-state.interface";

export interface PlaylistState {
  songState: SongStreamState;
  mode: string | 'repeat' | 'shuffle' | 'only';
  showPlaylist: boolean;
  mute: boolean;
}
