# Vebooks.ai - AI-Powered Educational Content Platform

## 🌟 Overview

Vebooks.ai is a revolutionary platform that leverages artificial intelligence to create personalized educational content including interactive eBooks, educational videos, study workbooks, and children's stories. Our platform transforms learning preferences into engaging, customized educational materials for learners of all ages.

## ✨ Key Features

### 🎯 AI-Powered Content Generation
- **Intelligent Content Creation**: Advanced AI generates personalized educational content based on user preferences, learning styles, and educational goals
- **Multiple Content Types**: Support for interactive eBooks, educational videos, study workbooks, and personalized stories
- **Custom Illustrations**: Beautiful, AI-generated illustrations that perfectly match your content theme and style

### 👥 Multi-User Support
- **Individual Accounts**: Perfect for personal learning and content creation
- **Family Plans**: Support for multiple children with parental controls and family sharing
- **Educator Tools**: Classroom management, student progress tracking, and curriculum alignment
- **Enterprise Solutions**: School-wide deployment with advanced analytics and administrative controls

### 🛡️ Child Safety & Compliance
- **COPPA Compliant**: Full compliance with Children's Online Privacy Protection Act
- **Content Moderation**: Advanced AI-powered content filtering and safety measures
- **Parental Controls**: Comprehensive monitoring and control features for parents

### 🌍 Accessibility & Localization
- **Multi-Language Support**: Create content in 25+ languages with cultural sensitivity
- **Accessibility Features**: Screen reader support, high contrast modes, and adaptive interfaces
- **Learning Style Adaptation**: Content tailored to visual, auditory, kinesthetic, and reading/writing learners

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (for containerized deployment)
- Google Cloud Platform account (for AI services)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/vebooks-ai.git
   cd vebooks-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration values
   ```

4. **Database Setup**
   ```bash
   # Start PostgreSQL and Redis
   docker-compose up postgres redis -d

   # Run database migrations
   cd server && npm run db:migrate
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Start backend server
   cd server && npm run dev

   # Terminal 2 - Start frontend client
   cd client && npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api/docs

### Docker Deployment

1. **Build and Start All Services**
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**
   - Application: http://localhost
   - The nginx reverse proxy handles routing

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state, React Context for global state
- **UI Components**: Custom component library built on Radix UI primitives

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for session storage and caching
- **Authentication**: JWT with refresh token rotation
- **File Storage**: Google Cloud Storage for media assets

### AI & Machine Learning
- **Content Generation**: Google Vertex AI (PaLM 2, Codey, Imagen)
- **Text Processing**: OpenAI GPT-4 for content refinement
- **Vector Search**: Google Cloud Vector Search for semantic content matching
- **Content Moderation**: Google Perspective API for safety filtering

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for development, Kubernetes for production
- **Reverse Proxy**: Nginx with SSL termination and load balancing
- **Monitoring**: Google Cloud Monitoring and Logging

## 📁 Project Structure

```
vebooks-ai/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic services
│   │   ├── models/        # Database models
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── nginx/                 # Nginx configuration
├── database/              # Database initialization scripts
├── docs/                  # Documentation
├── docker-compose.yml     # Development environment
├── Dockerfile.client      # Client container configuration
├── Dockerfile.server      # Server container configuration
└── README.md
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run type-check` - Run TypeScript type checking

### Client Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run client tests
- `npm run lint` - Lint client code

### Server Scripts
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript for production
- `npm run start` - Start production server
- `npm run test` - Run server tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## 🔐 Environment Variables

Key environment variables (see `.env.example` for complete list):

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vebooks_db

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

# Google Cloud Platform
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-cloud-key.json

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- --testNamePattern="User"
```

### Test Structure
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and service integration testing
- **E2E Tests**: Full user journey testing with Playwright

## 🚀 Deployment

### Production Deployment with Docker

1. **Build Production Images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy to Production**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment (Google Cloud Platform)

1. **Setup Google Cloud Project**
   ```bash
   gcloud config set project your-project-id
   gcloud services enable container.googleapis.com
   ```

2. **Deploy to Google Kubernetes Engine**
   ```bash
   kubectl apply -f k8s/
   ```

## 📊 Monitoring & Analytics

### Application Monitoring
- **Health Checks**: Built-in health check endpoints
- **Metrics**: Custom metrics for content generation, user engagement
- **Logging**: Structured logging with different levels
- **Error Tracking**: Integration with Sentry for error monitoring

### Business Analytics
- **User Analytics**: Google Analytics integration
- **Content Performance**: Track content views, downloads, ratings
- **Revenue Metrics**: Subscription and usage analytics
- **Learning Insights**: Educational effectiveness metrics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- **Formatting**: Prettier for code formatting
- **Linting**: ESLint for code quality
- **TypeScript**: Strict type checking enabled
- **Commit Messages**: Conventional Commits format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Developer Guide](docs/developer-guide.md)

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/your-org/vebooks-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/vebooks-ai/discussions)
- **Email**: support@vebooks.ai

### Community
- **Discord**: [Join our community](https://discord.gg/vebooks)
- **Twitter**: [@VebooksAI](https://twitter.com/VebooksAI)
- **Blog**: [vebooks.ai/blog](https://vebooks.ai/blog)

## 🎯 Roadmap

### Q1 2024
- [ ] Enhanced video creation capabilities
- [ ] Advanced voice synthesis options
- [ ] Mobile app development
- [ ] Advanced analytics dashboard

### Q2 2024
- [ ] Collaborative editing features
- [ ] Enhanced accessibility features
- [ ] Advanced AI personalization
- [ ] Marketplace for user-generated content

### Q3 2024
- [ ] Virtual reality content support
- [ ] Advanced assessment tools
- [ ] Multi-tenant architecture
- [ ] Advanced security features

---

**Built with ❤️ for educators, parents, and learners worldwide.**

For more information, visit [vebooks.ai](https://vebooks.ai)