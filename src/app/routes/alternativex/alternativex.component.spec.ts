import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativexComponent } from './alternativex.component';

describe('AlternativexComponent', () => {
  let component: AlternativexComponent;
  let fixture: ComponentFixture<AlternativexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
