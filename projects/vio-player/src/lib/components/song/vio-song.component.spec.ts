import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VioSongComponent } from './vio-song.component';

describe('SongComponent', () => {
  let component: VioSongComponent;
  let fixture: ComponentFixture<VioSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VioSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VioSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
