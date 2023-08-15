import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VioPlayerComponent } from './vio-player.component';

describe('VioPlayerComponent', () => {
  let component: VioPlayerComponent;
  let fixture: ComponentFixture<VioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VioPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
