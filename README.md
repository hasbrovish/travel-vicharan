# Vichran Trip - Travel Booking Application

A modern, full-featured travel booking web application built with Angular 20 for Vichran Trip, a travel agency based in Jaipur, Rajasthan, India.

![Angular](https://img.shields.io/badge/Angular-20.3.5-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 📦 Package Management
- Browse 8+ curated tour packages (domestic & international)
- Advanced filtering by type, category, and price range
- Search functionality across destinations and package names
- Grid and list view toggle
- 5-star rating system with review counts
- Real-time departure status (Available, Filling Fast, Sold Out)

### 🎫 Booking System
- Multi-passenger booking with dynamic form arrays
- Real-time form validation (email, phone patterns)
- Auto-generated booking references
- Booking history with status tracking
- LocalStorage persistence for bookings

### 🎨 Modern UI/UX
- Responsive design (mobile-first approach)
- Hero carousel with gradient overlays
- Custom dark teal theme matching brand identity
- Smooth animations and transitions
- Bootstrap 5 components with custom styling

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 20.3.5

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hasbrovish/travel-vicharan.git
   cd travel-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you modify source files.

## 🛠️ Tech Stack

### Frontend Framework
- **Angular** 20.3.5 - Modern web framework
- **TypeScript** 5.9.2 - Type-safe development
- **RxJS** 7.8.0 - Reactive programming

### UI & Styling
- **Bootstrap** 5.3.8 - Responsive framework
- **Bootstrap Icons** 1.13.1 - Icon library
- **Custom CSS** - Theme-based styling

### Build & Development
- **Angular CLI** 20.3.5 - Development tooling
- **Vite** - Fast build tool
- **Karma + Jasmine** - Testing framework
- **Prettier** - Code formatting

## 📁 Project Structure

```
travel-booking/
├── src/
│   ├── app/
│   │   ├── components/          # UI components
│   │   │   ├── home/           # Landing page with carousel
│   │   │   ├── header/         # Navigation header
│   │   │   ├── footer/         # Footer with contact info
│   │   │   ├── package-list/   # Package browsing & filtering
│   │   │   ├── package-card/   # Reusable package card
│   │   │   ├── package-detail/ # Detailed package view
│   │   │   ├── booking-form/   # Multi-passenger booking
│   │   │   └── my-bookings/    # Booking history
│   │   ├── services/           # Business logic
│   │   │   ├── data.service.ts
│   │   │   ├── package.service.ts
│   │   │   └── booking.service.ts
│   │   ├── models/             # TypeScript interfaces
│   │   │   ├── tour-package.model.ts
│   │   │   ├── passenger.model.ts
│   │   │   └── booking.model.ts
│   │   ├── app.ts             # Root component
│   │   └── app.routes.ts      # Route configuration
│   ├── styles.css             # Global theme styles
│   └── index.html             # HTML entry point
├── public/
│   └── vichran.jpeg          # Company logo
├── angular.json              # Angular configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎨 Theme & Branding

### Color Palette
```css
--primary-color: #1e5558      /* Dark teal (brand color) */
--primary-dark: #163f42       /* Darker teal */
--secondary-color: #4db8c4    /* Light blue accent */
--light-bg: #ffffff           /* White background */
```

### Logo
- Format: JPEG
- Header: 40px height
- Footer: 30px height
- Location: `/public/vichran.jpeg`

## 🗺️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Featured packages & carousel |
| `/packages` | PackageList | Browse all packages |
| `/packages/:id` | PackageDetail | Package details & booking |
| `/booking/:id` | BookingForm | Multi-passenger form |
| `/my-bookings` | MyBookings | Booking history |

## 📊 Data Models

### Tour Package
```typescript
interface TourPackage {
  id: string;
  packageCode: string;
  name: string;
  description: string;
  category: 'FAMILY' | 'HONEYMOON' | 'GROUP' | 'WEEKEND' | 'SENIORS';
  type: 'DOMESTIC' | 'INTERNATIONAL';
  days: number;
  nights: number;
  basePrice: number;
  currency: 'INR';
  destinations: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  departures: Departure[];
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  totalReviews: number;
  isActive: boolean;
}
```

### Booking
```typescript
interface Booking {
  id: string;
  bookingReference: string;
  packageId: string;
  packageName: string;
  packageImage: string;
  departureDate: string;
  departureCity: string;
  passengers: Passenger[];
  totalAmount: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  createdAt: string;
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build

# Run tests
npm test
# or
ng test

# Format code
npx prettier --write .
```

### Code Scaffolding

Generate new components:
```bash
ng generate component component-name
```

Generate services:
```bash
ng generate service service-name
```

For more options:
```bash
ng generate --help
```

## 🏗️ Building for Production

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

### Build Optimization
- Tree-shaking for minimal bundle size
- Ahead-of-Time (AOT) compilation
- Minification and compression
- Lazy loading for optimized performance

## 🧪 Testing

### Unit Tests
```bash
ng test
```

Tests are executed via [Karma](https://karma-runner.github.io) with Jasmine framework.

### End-to-End Tests
```bash
ng e2e
```

Note: E2E testing framework needs to be configured separately.

## 📱 Responsive Design

The application is fully responsive and tested on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📞 Contact Information

**Vichran Trip**
- 📍 Location: Jaipur, Rajasthan, India
- 📞 Phone: +91 9929443313, +91 9785757753
- 🌐 Facebook: [Vichran Trip](https://www.facebook.com/share/1BXms38WA5/)
- 📸 Instagram: [@vichrantrip](https://www.instagram.com/vichrantrip)

## 🔄 Current Status

### ✅ Completed Features
- [x] Complete package browsing system
- [x] Advanced filtering and search
- [x] Multi-passenger booking system
- [x] Booking history management
- [x] Custom theme implementation
- [x] Responsive design
- [x] LocalStorage persistence
- [x] Form validation

### 🚧 Future Enhancements
- [ ] Backend API integration
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] User authentication & profiles
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Review and rating submission
- [ ] Multi-language support (i18n)
- [ ] Real package data from Vichran Trip

## 📝 Sample Packages

The application includes 8 sample tour packages:

### International Tours (3)
1. **European Splendours** - 10D/9N - ₹262,000
2. **Dubai Extravaganza** - 5D/4N - ₹85,000
3. **Magical Thailand** - 7D/6N - ₹68,000

### Domestic Tours (5)
1. **Kerala Highlights** - 6D/5N - ₹45,000
2. **Rajasthan Royal** - 7D/6N - ₹52,000
3. **Goa Beach Paradise** - 5D/4N - ₹32,000
4. **Kashmir Paradise** - 6D/5N - ₹38,000
5. **Singapore Malaysia** - 6D/5N - ₹72,000

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.dev/)
- Styled with [Bootstrap](https://getbootstrap.com/)
- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)
- Images from [Unsplash](https://unsplash.com/)
- Developed with assistance from [Claude Code](https://claude.com/claude-code)

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev/docs)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

---

**Made with ❤️ by Vichran Trip Team**

For questions or support, please contact us through our social media channels.
