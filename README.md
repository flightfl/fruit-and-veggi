### Fruits & Vegetables Explorer


**Project Purpose**

This web application serves as an educational tool for learning about fruits and vegetables with AI-powered translations to different languages and comprehensive nutritional information. Users can explore produce items, compare their nutritional values using drag-and-drop functionality, save favorites, and get personalized health insights powered by AI.

### How to Run and Deploy the Project
**Prerequisites**

* Node.js 20+
* MongoDB (local or cloud instance)
* Google Cloud Project with Vertex AI enabled
* USDA API Key
* Unsplash/Pexels API Keys (optional, for images)

### Local Development Setup

**1. Clone the repository**

```
git clone <repository-url>
cd fruit-and-veggi
```

**2. Backend Setup**
```
cd fruit-veggie-api
npm install

# Create .env file with required variables:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fruit-veggie-app
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLOUD_PROJECT_ID=your-project-id
USDA_API_KEY=your_usda_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
PEXELS_API_KEY=your_pexels_key

# Seed the database
npm run seed-produce

# Start development server
npm run dev
```

**2. Frontend Setup**
```
cd ../fruit-veggie-app
npm install

# Build WebAssembly module
npm run build:wasm

# Start development server
npm run dev
```

### Deployment to Google Cloud
**Backend Deployment (Google App Engine)**
```
cd fruit-veggie-api
gcloud app deploy
```

**Frontend Deployment (Google App Engine)**
```
cd fruit-veggie-app
npm run build
gcloud app deploy
```
## CI/CD Pipeline
GitHub Actions workflows are configured to automatically build and deploy on push to main branch. See `.github/workflows/` directory for configuration.

## API Endpoints Documentation

### Authentication Endpoints
- `POST /api/users/login` - Login with name
  - Body: `{ "name": "string" }`
  - Returns: User object with JWT cookie
- `POST /api/users/logout` - Logout user
- `GET /api/users/profile` - Get current user profile (authenticated)

### Produce Endpoints
- `GET /api/produce` - Get all produce items
- `GET /api/produce/:id` - Get specific produce item
- `POST /api/produce` - Create new produce item (admin)

### Favorites Endpoints
- `POST /api/users/favorites` - Add item to favorites
  - Body: `{ "produceId": "string" }`
- `GET /api/users/favorites` - Get user's favorites
- `DELETE /api/users/favorites/:id` - Remove from favorites

### AI Features Endpoints
- `POST /api/ai/health-insights/:id` - Generate health insights for produce item
- `POST /api/ai/translate/:id` - Generate translations for produce item
- `POST /api/ai/batch-process` - Batch process multiple items

### USDA Integration Endpoints
- `GET /api/usda/search?query=apple&limit=10` - Search USDA food database
- `POST /api/usda/import/:fdcId` - Import food from USDA to our database
