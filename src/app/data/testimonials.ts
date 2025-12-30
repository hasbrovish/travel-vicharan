export interface Testimonial {
  id: string;
  name: string;
  trip: string;
  rating: number;
  text: string;
  image: string;
  date: string;
  verified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_001',
    name: 'Rajesh & Priya Kumar',
    trip: 'Kerala Backwaters 4N/5D',
    rating: 5,
    text: 'Our honeymoon in Kerala was absolutely magical! The houseboat experience and Munnar tea gardens were breathtaking. VichranTrip made everything seamless.',
    image: 'https://i.pravatar.cc/150?img=1',
    date: 'Dec 2024',
    verified: true
  },
  {
    id: 'test_002',
    name: 'Amit Sharma',
    trip: 'Kashmir Paradise 5N/6D',
    rating: 5,
    text: 'Gulmarg gondola and Dal Lake shikara ride were the highlights. Perfect family vacation with excellent hotels and guide. Highly recommend!',
    image: 'https://i.pravatar.cc/150?img=12',
    date: 'Nov 2024',
    verified: true
  },
  {
    id: 'test_003',
    name: 'Sneha & Family',
    trip: 'Himachal Grand Tour 6N/7D',
    rating: 5,
    text: 'Amazing experience covering Shimla, Manali, and Dharamshala. Kids loved Kufri and Solang Valley. Great value for money!',
    image: 'https://i.pravatar.cc/150?img=5',
    date: 'Oct 2024',
    verified: true
  },
  {
    id: 'test_004',
    name: 'Vikram Desai',
    trip: 'Dubai Luxury 4N/5D',
    rating: 5,
    text: 'Burj Khalifa, desert safari, and Dubai Mall - everything was perfectly organized. The VichranTrip team was very responsive.',
    image: 'https://i.pravatar.cc/150?img=8',
    date: 'Jan 2025',
    verified: true
  },
  {
    id: 'test_005',
    name: 'Meera & Rohan',
    trip: 'Andaman Island Escape 4N/5D',
    rating: 5,
    text: 'Crystal clear waters, pristine beaches, and amazing water sports. Our best vacation yet! Thank you VichranTrip for the wonderful memories.',
    image: 'https://i.pravatar.cc/150?img=9',
    date: 'Dec 2024',
    verified: true
  },
  {
    id: 'test_006',
    name: 'Ankit Patel',
    trip: 'Thailand Classic 5N/6D',
    rating: 5,
    text: 'Bangkok temples and Pattaya beaches were incredible. Great hotel selection and the tour guide was very knowledgeable. Will book again!',
    image: 'https://i.pravatar.cc/150?img=13',
    date: 'Nov 2024',
    verified: true
  }
];

export default TESTIMONIALS;
