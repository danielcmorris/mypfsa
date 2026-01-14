import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linc } from './linc';

describe('Linc', () => {
  let component: Linc;
  let fixture: ComponentFixture<Linc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Linc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Linc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
