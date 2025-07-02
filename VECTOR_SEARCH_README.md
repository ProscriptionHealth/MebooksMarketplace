# Mebooks.ai Vector Search Implementation

This document describes the comprehensive vector search implementation for Mebooks.ai, an AI-powered ebook marketplace with semantic search capabilities using Google Vertex AI Vector Search.

## 🏗️ Architecture Overview

The vector search system consists of several key components:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend │    │  Vertex AI      │
│                 │◄──►│                  │◄──►│  Vector Search  │
│  - Search UI    │    │  - REST API      │    │  - Embeddings   │
│  - Results      │    │  - Processing    │    │  - Index        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Google Cloud    │
                       │  - Storage       │
                       │  - BigQuery      │
                       │  - Vertex AI     │
                       └──────────────────┘
```

## 🚀 Key Features

### 1. Semantic Ebook Processing
- **Text Extraction**: Supports PDF, EPUB, and TXT formats
- **Content Chunking**: Intelligent text segmentation for optimal embedding generation
- **Keyword Extraction**: NLP-based keyword identification using TF-IDF and lemmatization
- **LLM Analysis**: Uses Google Gemini for semantic summary generation

### 2. Vector Search Capabilities
- **Semantic Search**: Find ebooks based on meaning, not just keywords
- **Hybrid Search**: Combines semantic and keyword-based search
- **Similar Ebooks**: Find related content based on content similarity
- **Personalized Recommendations**: User-based ebook suggestions
- **Category & Complexity Filtering**: Advanced filtering options

### 3. Vertex AI Integration
- **Vector Embeddings**: Uses Sentence Transformers for high-quality embeddings
- **Scalable Index**: Vertex AI Vector Search for production-ready performance
- **Real-time Search**: Sub-second response times for search queries
- **Automatic Scaling**: Handles varying load with automatic scaling

## 📁 File Structure

```
├── semantic_generator.py          # Core semantic processing service
├── vector_search_service.py       # Vertex AI Vector Search integration
├── vector_search_api.py          # FastAPI REST API
├── src/services/
│   └── vectorSearchService.ts    # Frontend TypeScript service
├── requirements.txt              # Python dependencies
├── Dockerfile                    # Backend container
├── Dockerfile.frontend          # Frontend container
├── docker-compose.yml           # Local development setup
├── deploy.sh                    # GCP deployment script
└── env.example                  # Environment variables template
```

## 🛠️ Installation & Setup

### Prerequisites

1. **Google Cloud Project**
   - Enable Vertex AI API
   - Enable Cloud Storage API
   - Enable BigQuery API
   - Create service account with appropriate permissions

2. **Python 3.11+**
3. **Node.js 18+**
4. **Docker & Docker Compose**

### 1. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

Required environment variables:
```bash
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
API_KEY=your-gemini-api-key
VECTOR_SEARCH_API_KEY=your-vector-search-api-key
```

### 2. Install Dependencies

```bash
# Python dependencies
pip install -r requirements.txt

# Frontend dependencies
npm install
```

### 3. Local Development

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or run services individually
python vector_search_api.py  # Backend API
npm start                    # Frontend
```

## 🔧 Usage Examples

### 1. Processing an Ebook

```python
from semantic_generator import SemanticGeneratorService, EbookMetadata

# Initialize service
service = SemanticGeneratorService("your-project-id")

# Create metadata
metadata = EbookMetadata(
    id="unique-ebook-id",
    title="AI Product Management Guide",
    author="John Doe",
    category="Product Management",
    complexity="Intermediate",
    file_path="/path/to/ebook.pdf"
)

# Process ebook
semantic_data = await service.process_ebook(metadata)
await service.store_semantic_data(semantic_data)
```

### 2. Semantic Search

```python
from vector_search_service import VectorSearchService

# Initialize service
service = VectorSearchService("your-project-id")

# Perform search
results = await service.hybrid_search(
    query="machine learning for beginners",
    filters={"category": "AI", "complexity": "Beginner"},
    num_results=10
)
```

### 3. Frontend Integration

```typescript
import { vectorSearchService } from './services/vectorSearchService';

// Search ebooks
const results = await vectorSearchService.hybridSearch(
  "AI product development",
  { category: "Product Management" },
  20
);

// Get similar ebooks
const similar = await vectorSearchService.getSimilarEbooks("ebook-id", 5);

// Get recommendations
const recommendations = await vectorSearchService.getRecommendations("user-id", 10);
```

## 🚀 Deployment

### Google Cloud Platform

```bash
# Make deployment script executable
chmod +x deploy.sh

# Deploy to GCP
./deploy.sh
```

### Manual Deployment

```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/mebooks-vector-search

# Deploy to Cloud Run
gcloud run deploy mebooks-vector-search \
  --image gcr.io/PROJECT_ID/mebooks-vector-search \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 📊 API Endpoints

### Search Endpoints

- `POST /api/search` - Semantic search
- `POST /api/hybrid-search` - Hybrid search (semantic + keyword)
- `GET /api/similar/{ebook_id}` - Find similar ebooks
- `GET /api/recommendations/{user_id}` - Get personalized recommendations
- `GET /api/popular` - Get popular ebooks

### Processing Endpoints

- `POST /api/process-ebook` - Process uploaded ebook
- `POST /api/batch-process` - Process multiple ebooks

### Management Endpoints

- `GET /health` - Health check
- `POST /api/rebuild-index` - Rebuild vector search index
- `GET /api/index-status` - Get index status

## 🔍 Search Features

### 1. Semantic Understanding
The system understands user intent and context:
- "I want to learn AI from scratch" → Finds beginner AI books
- "Advanced machine learning techniques" → Finds expert-level ML content
- "Product management for tech startups" → Finds relevant PM books

### 2. Content-Based Recommendations
- Analyzes ebook content to find similar books
- Considers technical concepts, learning objectives, and difficulty levels
- Provides personalized recommendations based on user preferences

### 3. Advanced Filtering
- Category filtering (AI, Product Management, etc.)
- Complexity filtering (Beginner, Intermediate, Advanced, Expert)
- Author filtering
- Price range filtering
- Framework/tool filtering

## 🎯 Performance Optimization

### 1. Embedding Generation
- Uses efficient Sentence Transformers model (all-MiniLM-L6-v2)
- Batch processing for multiple ebooks
- Caching of embeddings to avoid regeneration

### 2. Search Optimization
- Vector search with cosine similarity
- Hybrid search combining semantic and keyword matching
- Result ranking based on relevance scores
- Pagination for large result sets

### 3. Scalability
- Vertex AI Vector Search for production-scale performance
- Cloud Run for automatic scaling
- Redis caching for frequently accessed data
- BigQuery for metadata storage and analytics

## 🔒 Security Considerations

### 1. Authentication
- API key-based authentication for backend services
- JWT tokens for user authentication
- CORS configuration for frontend access

### 2. Data Protection
- Encrypted storage of ebook content
- Secure handling of user data
- Compliance with data privacy regulations

### 3. Access Control
- Role-based access control for different user types
- Secure file upload handling
- Input validation and sanitization

## 📈 Monitoring & Analytics

### 1. Search Analytics
- Track popular search queries
- Monitor search performance metrics
- Analyze user behavior patterns

### 2. System Monitoring
- Health checks for all services
- Performance metrics for vector search
- Error tracking and alerting

### 3. Business Intelligence
- Ebook popularity trends
- User engagement metrics
- Revenue analytics

## 🧪 Testing

### 1. Unit Tests
```bash
# Run Python tests
pytest tests/

# Run TypeScript tests
npm test
```

### 2. Integration Tests
```bash
# Test API endpoints
python -m pytest tests/integration/

# Test vector search functionality
python -m pytest tests/vector_search/
```

### 3. Performance Tests
```bash
# Load testing
python tests/performance/load_test.py

# Search performance testing
python tests/performance/search_test.py
```

## 🔄 Continuous Integration

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          pip install -r requirements.txt
          pytest tests/
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GCP
        run: ./deploy.sh
```

## 📚 Additional Resources

### Documentation
- [Vertex AI Vector Search Documentation](https://cloud.google.com/vertex-ai/docs/vector-search/overview)
- [Google Cloud AI Platform](https://cloud.google.com/ai-platform)
- [Sentence Transformers](https://www.sbert.net/)

### Related Services
- [Google Cloud Storage](https://cloud.google.com/storage)
- [BigQuery](https://cloud.google.com/bigquery)
- [Cloud Run](https://cloud.google.com/run)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and troubleshooting guides

---

**Note**: This implementation provides a production-ready vector search solution for Mebooks.ai, enabling powerful semantic search capabilities that enhance user experience and discovery of relevant ebooks. 