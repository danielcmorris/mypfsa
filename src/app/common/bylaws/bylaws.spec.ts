import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bylaws } from './bylaws';

describe('Bylaws', () => {
  let component: Bylaws;
  let fixture: ComponentFixture<Bylaws>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bylaws]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bylaws);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
