import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
  destination: string;
}

@Component({
  selector: 'app-pre-departure-videos',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './pre-departure-videos.html',
  styleUrl: './pre-departure-videos.css'
})
export class PreDepartureVideos implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;
  selectedCategory: string = 'all';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    // Mock video data
    this.videos = [
      {
        id: '1',
        title: 'Essential Travel Tips for International Tours',
        description: 'Learn about visa requirements, currency exchange, and essential documents needed for international travel.',
        thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15:30',
        category: 'General',
        destination: 'All Destinations'
      },
      {
        id: '2',
        title: 'Dubai Travel Guide - What to Expect',
        description: 'Everything you need to know before visiting Dubai, including cultural norms, weather, and must-see attractions.',
        thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '12:45',
        category: 'Destination',
        destination: 'Dubai'
      },
      {
        id: '3',
        title: 'Thailand Travel Essentials',
        description: 'Important information about Thailand including visa on arrival, local customs, and safety tips.',
        thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '18:20',
        category: 'Destination',
        destination: 'Thailand'
      },
      {
        id: '4',
        title: 'Packing Tips for Different Climates',
        description: 'Learn how to pack efficiently for tropical, cold, and temperate climates.',
        thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '10:15',
        category: 'General',
        destination: 'All Destinations'
      },
      {
        id: '5',
        title: 'Kerala Backwaters Experience',
        description: 'What to expect during your Kerala houseboat experience and how to make the most of it.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '14:00',
        category: 'Destination',
        destination: 'Kerala'
      },
      {
        id: '6',
        title: 'Travel Insurance and Health Tips',
        description: 'Understanding travel insurance coverage and health precautions for international travel.',
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '16:30',
        category: 'General',
        destination: 'All Destinations'
      }
    ];
  }

  getCategories(): string[] {
    return ['all', ...Array.from(new Set(this.videos.map(v => v.category)))];
  }

  getFilteredVideos(): Video[] {
    if (this.selectedCategory === 'all') {
      return this.videos;
    }
    return this.videos.filter(v => v.category === this.selectedCategory);
  }

  selectVideo(video: Video): void {
    this.selectedVideo = video;
  }

  closeVideo(): void {
    this.selectedVideo = null;
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

