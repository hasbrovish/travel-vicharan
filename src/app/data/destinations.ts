export interface Destination {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  packageCount: number;
  region: string;
  highlights: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest_kerala',
    name: 'Kerala',
    slug: 'kerala',
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800',
    description: 'God\'s Own Country - Backwaters, Tea Gardens & Beaches',
    packageCount: 3,
    region: 'South India',
    highlights: ['Backwaters', 'Tea Plantations', 'Beaches', 'Ayurveda']
  },
  {
    id: 'dest_kashmir',
    name: 'Kashmir',
    slug: 'kashmir',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
    description: 'Paradise on Earth - Dal Lake, Gulmarg & Snow',
    packageCount: 1,
    region: 'North India',
    highlights: ['Dal Lake', 'Gulmarg', 'Houseboats', 'Mughal Gardens']
  },
  {
    id: 'dest_himachal',
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
    description: 'Land of Gods - Mountains, Adventure & Spirituality',
    packageCount: 3,
    region: 'North India',
    highlights: ['Shimla', 'Manali', 'Dharamshala', 'Solang Valley']
  },
  {
    id: 'dest_rajasthan',
    name: 'Rajasthan',
    slug: 'rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09e?w=800',
    description: 'Royal Heritage - Forts, Palaces & Desert',
    packageCount: 1,
    region: 'North India',
    highlights: ['Jaipur', 'Udaipur', 'Jodhpur', 'Desert Safari']
  },
  {
    id: 'dest_goa',
    name: 'Goa',
    slug: 'goa',
    imageUrl: 'https://images.unsplash.com/photo-1546971587-02375cbbdade?w=800',
    description: 'Beach Paradise - Sun, Sand & Nightlife',
    packageCount: 1,
    region: 'West India',
    highlights: ['Beaches', 'Water Sports', 'Portuguese Culture', 'Nightlife']
  },
  {
    id: 'dest_andaman',
    name: 'Andaman',
    slug: 'andaman',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?w=800',
    description: 'Tropical Paradise - Crystal Waters & Marine Life',
    packageCount: 1,
    region: 'Islands',
    highlights: ['Radhanagar Beach', 'Scuba Diving', 'Ross Island', 'Neil Island']
  }
];

export default DESTINATIONS;
