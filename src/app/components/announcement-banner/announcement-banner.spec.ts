import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementBanner } from './announcement-banner';

describe('AnnouncementBanner', () => {
  let component: AnnouncementBanner;
  let fixture: ComponentFixture<AnnouncementBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
