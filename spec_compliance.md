
This document details how this Fruits & Vegetables Explorer project meets modern web development specifications.

## Technical Requirements Compliance

### ✅ 1. Semantic HTML5 & APIs
- **Semantic HTML5**: Used `<header>`, `<nav>`, `<article>`, `<section>` throughout components
- **Drag and Drop API**: Implemented using @dnd-kit library for comparing produce items side-by-side
- **Location**: `src/pages/Home.jsx`, `src/components/DraggableProduceCard.jsx`, `src/components/ComparisonDropZone.jsx`

### ✅ 2. Responsive Design (320px minimum)
- **Mobile-first approach**: CSS designed for screens as small as 320px
- **Flexible grid layouts**: Produce grid adapts from 1 column (mobile) to 4+ columns (desktop)
- **Responsive navigation**: Navbar collapses and simplifies on smaller screens
- **Location**: `src/index.css` with comprehensive media queries

### ✅ 3. Progressive Web App (PWA) - Offline Functionality
- **Service Worker**: Caches resources and provides offline functionality
- **Web App Manifest**: Configures app metadata and enables installation
- **Offline Support**: Shows cached content and "attempting to fetch data" message when offline
- **Location**: `public/sw.js`, `public/manifest.json`, `src/utils/registerSW.js`, `public/offline.html`

### ✅ 4. HTTPS
- **Production deployment**: All Google Cloud App Engine services use HTTPS by default
- **Configuration**: Both `app.yaml` files specify `secure: always` for all routes

### ✅ 5. Single Page Application
- **React Router**: Client-side routing without page reloads
- **Dynamic content loading**: All navigation handled within the SPA framework
- **Scrolling requirements**: Content only is scrolled within the component
- **Location**: `src/App.jsx` with React Router configuration

### ✅ 6. Aesthetic Design
- **Professional styling**: Clean, modern interface with consistent color scheme
- **User-friendly**: Intuitive navigation and clear visual hierarchy
- **Functional over beautiful**: Prioritized meeting requirements while maintaining good UX

### ✅ 7. CSS Processing
- **Custom CSS**: Modern features like flexbox, grid, and gradients
- **Organized styling**: Comprehensive styles in `src/index.css`
- **Note**: Chose custom CSS over preprocessors for better control and learning

### ✅ 8. Authentication with Cookies
- **JWT with HTTP-only cookies**: Secure authentication implementation preventing XSS
- **Cookie banner**: Informs users about cookie usage and their rights (GDPR compliance)
- **Session management**: Proper login/logout functionality with token expiration
- **Location**: `fruit-veggie-api/routes/userRoutes.js`, `src/components/CookieBanner.jsx`

### ✅ 9. Security (SQL Injection, CSRF, XSS)
- **MongoDB with Mongoose**: ODM provides built-in protection against NoSQL injection
- **HTTP-only cookies**: Prevents XSS attacks on authentication tokens
- **CSRF protection**: Implemented through cookie-based authentication
- **Input validation**: Server-side validation on all user inputs
- **Location**: `fruit-veggie-api/middleware/authMiddleware.js`, all route handlers

### ✅ 10. Database and Caching Layer
- **MongoDB**: Primary database using Mongoose ODM for data persistence
- **Redis**: Optional caching layer for improved API performance
- **Mongoose ODM**: Provides schema validation and query building
- **Location**: `fruit-veggie-api/models/`, `fruit-veggie-api/config/redis.js`

### ✅ 11. Node.js and Express Backend
- **Express.js**: RESTful API with proper middleware stack
- **Node.js**: Server-side JavaScript runtime
- **Modular architecture**: Separated routes, models, services, and middleware
- **Location**: `fruit-veggie-api/server.js`, `fruit-veggie-api/routes/`

### ✅ 12. PWA with Service Worker
- **Service Worker**: Handles caching and offline functionality
- **Installable**: Manifest allows installation on desktop and mobile
- **Offline messaging**: Shows appropriate messages when data unavailable
- **Background sync**: Caches viewed items for offline access
- **Location**: `public/sw.js`, `public/manifest.json`

### ✅ 13. WebAssembly Module (Extra Credit)
- **AssemblyScript**: TypeScript-like language compiled to WebAssembly
- **Nutrition calculations**: Fast scoring algorithms and serving size calculations
- **Performance**: Complex mathematical operations run at near-native speed
- **Location**: `assembly/index.ts`, `src/services/wasmService.js`

### ✅ 14. AI Services Integration
- **Google Vertex AI**: Integration for health insights and translations
- **Gemini 2.0 Flash Lite**: Advanced language model for content generation
- **Caching**: AI responses cached to reduce costs and improve performance
- **Location**: `fruit-veggie-api/services/vertexAIService.js`, `fruit-veggie-api/routes/aiRoutes.js`

### ✅ 15. Frontend Framework
- **React 18**: Modern component-based architecture with hooks
- **Context API**: State management for user authentication and comparison features
- **Modern patterns**: Functional components, custom hooks, and proper state management
- **Location**: All components in `src/components/`, `src/pages/`, `src/contexts/`

### ✅ 16. Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA labels**: Added `aria-label` attributes for screen readers
- **Keyboard navigation**: All interactive elements accessible via tab navigation
- **Color contrast**: High contrast colors meeting WCAG guidelines
- **Focus management**: Visible focus indicators for keyboard users

### ✅ 17. Google Cloud Deployment with CI/CD
- **Google App Engine**: Scalable deployment for both frontend and backend services
- **GitHub Actions**: Automated CI/CD pipeline for build and deployment
- **Configuration**: Proper `app.yaml` files for both services
- **Location**: `fruit-veggie-app/app.yaml`, `fruit-veggie-api/app.yaml`

## Advanced Features Implemented

### USDA Food Data Integration
- **Real nutrition data**: 200+ foods with accurate USDA nutritional information
- **API integration**: Searchable database of thousands of food items
- **Data enrichment**: Automatic image fetching from Unsplash/Pexels APIs
- **Location**: `fruit-veggie-api/services/usdaService.js`, `fruit-veggie-api/seedProduce.js`

### Advanced User Experience
- **Drag-and-drop comparison**: Visual interface for comparing up to 3 produce items
- **Favorites system**: Persistent user preferences with authentication
- **Search and filtering**: Real-time search with nutritional filters
- **Smart nutrition scoring**: WebAssembly-powered nutrition analysis

### Performance Optimizations
- **Redis caching**: Reduces database queries and API calls
- **WebAssembly**: Computationally intensive operations run efficiently
- **Service Worker**: Offline caching and performance improvements
- **Image optimization**: Responsive images from professional APIs

## Deviations and Notes

### No Deviations
The project uses modern technology stack:
- **Frontend**: React with modern JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Google Cloud App Engine
- **Authentication**: JWT with HTTP-only cookies

### Advanced Features
- **WebAssembly**: Implemented complex nutrition scoring algorithms
- **AI Integration**: Advanced language model integration beyond basic requirements
- **Comprehensive API**: Full CRUD operations with external API integrations

## Testing Strategy

The project includes:
- **Error handling**: Comprehensive error handling throughout the application
- **Input validation**: Server-side validation for all user inputs
- **Fallback systems**: Graceful degradation when external services are unavailable
- **Development tools**: Proper development/production environment separation
