**Fruits & Vegetables Explorer**  

## System Architecture Diagram

```
┌─────────────────┐    HTTPS     ┌─────────────────┐
│   Frontend      │◄────────────►│   Backend API   │
│   (React SPA)   │              │   (Express.js)  │
└─────────────────┘              └─────────────────┘
         │                                │
         │ Service Worker                 │
         │ Caching                        │
         ▼                                ▼
┌─────────────────┐              ┌─────────────────┐
│  Browser Cache  │              │   MongoDB       │
│  Local Storage  │              │   (Primary DB)  │
│  (PWA Assets)   │              │                 │
└─────────────────┘              └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │   Redis Cache   │
                                 │   (Optional)    │
                                 └─────────────────┘

External API Integrations:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   USDA Food     │    │   Vertex AI     │    │ Unsplash/Pexels│
│   Data API      │    │   (Gemini 2.0)  │    │   Image APIs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌─────────────────┐
                        │   Backend API   │
                        │   (Express.js)  │
                        └─────────────────┘

Deployment Architecture:
┌────────────────────────────────────────────────────────┐
│               Google Cloud Platform                    │
│                                                        │
│  ┌─────────────────┐         ┌─────────────────┐       │
│  │  App Engine     │         │  App Engine     │       │
│  │  (Frontend)     │◄───────►│  (Backend API)  │       │
│  │  Service:default│         │  Service: api   │       │
│  └─────────────────┘         └─────────────────┘       │
│                                                        │
│  ┌─────────────────────────────────────────────────────┤
│  │            GitHub Actions CI/CD Pipeline            │
│  │                Build → Deploy                       │
│  └─────────────────────────────────────────────────────┘
└────────────────────────────────────────────────────────┘
```

**Communication Flow:**
1. **Frontend ↔ Backend:** HTTPS REST API calls with JSON payloads
2. **Backend ↔ Database:** Mongoose ODM with connection pooling
3. **Backend ↔ External APIs:** Authenticated HTTP requests to USDA, Vertex AI, image services
4. **Client ↔ Cache:** Service Worker manages cache strategy and offline functionality
5. **CI/CD:** GitHub Actions triggers automated deployment on code push

## Security and Privacy Features

### Authentication & Session Management
- **JWT with HTTP-only cookies:** Prevents XSS attacks by making tokens inaccessible to JavaScript
- **Secure cookie configuration:** `secure: true` in production, `sameSite` protection
- **Token expiration:** 30-day expiration with automatic cleanup

### Data Protection
- **MongoDB with Mongoose ODM:** Built-in protection against NoSQL injection attacks through parameterized queries
- **Input validation:** Server-side validation on all user inputs before database operations
- **CORS configuration:** Restricted to specific origins, prevents unauthorized cross-origin requests

### Privacy Compliance
- **Cookie banner:** GDPR-compliant notification informing users of cookie usage and rights
- **Minimal data collection:** Only collects essential user data (name, favorites)
- **Data encryption:** All communications encrypted via HTTPS

### Infrastructure Security
- **Google Cloud App Engine:** Automatic security patches and DDoS protection
- **Environment variables:** Sensitive configuration stored securely, not in code
- **Service isolation:** Frontend and backend deployed as separate services



