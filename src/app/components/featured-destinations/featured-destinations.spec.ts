import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDestinations } from './featured-destinations';

describe('FeaturedDestinations', () => {
  let component: FeaturedDestinations;
  let fixture: ComponentFixture<FeaturedDestinations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedDestinations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedDestinations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
