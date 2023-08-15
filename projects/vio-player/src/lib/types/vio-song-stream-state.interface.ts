export interface SongStreamState {
  playing: boolean;
  loading: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  volumeLevel: number;
  prevVolumeLevel: number;
  canplay: boolean;
  error: boolean;
}
