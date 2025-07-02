# Mebooks.ai Cursor Rules & Development Guidelines

## Project Overview & Context

You are developing **Mebooks.ai**, a specialized AI-focused ebook marketplace with a unique $0.25 flat-fee model. This platform serves AI practitioners, researchers, and knowledge seekers through sophisticated semantic search, seamless publishing workflows, and intelligent content discovery.

**Core Mission**: Enable frictionless knowledge transfer between AI experts and practitioners while supporting authors with transparent, equitable monetization.

## Technical Architecture Rules

### Stack Requirements - STRICT ADHERENCE

```typescript
// Primary Stack - NO SUBSTITUTIONS
- Framework: Next.js 14 with App Router (latest stable)
- Database: PostgreSQL via Supabase
- Authentication: NextAuth.js
- Payments: Stripe Connect
- Storage: AWS S3 or Cloudflare R2
- Search: PostgreSQL Full-Text + OpenAI Embeddings
- Styling: Tailwind CSS
- Forms: React Hook Form + Zod validation
- Hosting: Vercel
```

### Database Schema Guidelines

```sql
-- Core entities - maintain these relationships
users (id, email, name, role, stripe_account_id, expertise_areas[], created_at)
ebooks (id, title, description, price, file_url, cover_url, author_id, 
        category, complexity_rating, prerequisites[], framework_tags[], 
        embedding vector, created_at, updated_at)
orders (id, user_id, ebook_id, amount, platform_fee, status, 
        stripe_payment_intent, created_at)
categories (id, name, slug, description, parent_id)
author_profiles (user_id, bio, credentials[], social_links{}, 
                expertise_verification, reputation_score)
```

### Component Architecture Rules

#### Server Components (Default Choice)
```typescript
// Use for: Content display, data fetching, SEO-critical pages
// Examples: Ebook listings, author profiles, category pages
// Rule: Always prefer Server Components unless interactivity required

export default async function EbookListing({ category }: { category: string }) {
  const ebooks = await getEbooksByCategory(category)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ebooks.map(ebook => <EbookCard key={ebook.id} ebook={ebook} />)}
    </div>
  )
}
```

#### Client Components (Selective Use)
```typescript
// Use ONLY for: Search input, cart management, dynamic filters, real-time features
// Always mark with 'use client' directive
// Rule: Minimize client components to improve performance

'use client'
export function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  // Implementation here
}
```

### Search Implementation Standards

#### Hybrid Search Pattern - MANDATORY
```typescript
// Always implement both keyword and semantic search
async function hybridSearch(query: string, filters: SearchFilters) {
  // 1. PostgreSQL full-text search for exact matches
  const keywordResults = await supabase
    .from('ebooks')
    .select('*')
    .textSearch('title,description,author_name', query)
    .eq('category', filters.category)
  
  // 2. Semantic search using embeddings
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  })
  
  const semanticResults = await supabase.rpc('match_ebooks', {
    query_embedding: embedding.data[0].embedding,
    match_threshold: 0.8,
    match_count: 20
  })
  
  // 3. Merge and rank results
  return mergeAndRankResults(keywordResults, semanticResults)
}
```

#### Search Performance Requirements
- Results must appear within 300ms
- Implement debounced search (300ms delay)
- Cache popular queries for 5 minutes
- Use Redis for search result caching

### Payment Processing Rules

#### Stripe Connect Integration - EXACT IMPLEMENTATION
```typescript
// Author onboarding flow - DO NOT MODIFY
const createConnectedAccount = async (authorData: AuthorData) => {
  const account = await stripe.accounts.create({
    type: 'express',
    country: authorData.country,
    email: authorData.email,
    capabilities: {
      card_payments: {requested: true},
      transfers: {requested: true}
    }
  })
  
  // Store account ID immediately
  await updateAuthorStripeAccount(authorData.userId, account.id)
  
  return stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/author/onboarding/refresh`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/author/dashboard`,
    type: 'account_onboarding',
  })
}

// Payment processing - FLAT FEE ONLY
const processPayment = async (ebookId: string, userId: string) => {
  const ebook = await getEbook(ebookId)
  const PLATFORM_FEE = 25 // $0.25 in cents - NEVER CHANGE
  
  return stripe.paymentIntents.create({
    amount: ebook.price * 100,
    currency: 'usd',
    application_fee_amount: PLATFORM_FEE, // Always $0.25
    transfer_data: {
      destination: ebook.author.stripe_account_id,
    },
    metadata: {
      ebook_id: ebookId,
      user_id: userId
    }
  })
}
```

## UI/UX Design Guidelines

### Color Palette - STRICT ADHERENCE
```css
/* Primary AI-focused color scheme */
:root {
  --ai-teal: #00d4aa;        /* Primary brand, "me" in logo */
  --ai-blue: #0ea5e9;        /* Secondary, ".ai" domain */
  --ai-purple: #8b5cf6;      /* Accent, "my" elements */
  --ai-amber: #f59e0b;       /* Highlights, arrows, emphasis */
  --ai-pink: #ec4899;        /* Special elements, braces */
  
  --neural-bg: #0f0f23;      /* Dark background base */
  --neural-secondary: #1a1a3e; /* Secondary dark */
  --neural-tertiary: #16213e;  /* Tertiary gradient */
  
  --text-primary: #ffffff;    /* Primary text */
  --text-secondary: #94a3b8;  /* Secondary text */
  --text-muted: #64748b;      /* Muted text */
}
```

### Typography Standards
```css
/* Font hierarchy - REQUIRED */
.font-primary { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
.font-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace; }

/* Use mono for: Code, technical specifications, pricing */
/* Use Inter for: All other content */
```

### Layout Principles

#### Responsive Breakpoints
```typescript
// Tailwind breakpoints - USE THESE ONLY
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Ultra-wide
}

// Design priorities by device:
// Mobile: Search efficiency, quick access to purchased content
// Tablet: Information richness, touch optimization for presentations
// Desktop: Information density, comparison capabilities
```

#### Component Spacing Rules
```css
/* Consistent spacing scale - MANDATORY */
.space-unit-1 { margin: 4px; }   /* xs elements */
.space-unit-2 { margin: 8px; }   /* small elements */
.space-unit-3 { margin: 12px; }  /* default spacing */
.space-unit-4 { margin: 16px; }  /* medium spacing */
.space-unit-5 { margin: 20px; }  /* large spacing */
.space-unit-6 { margin: 24px; }  /* section spacing */
.space-unit-8 { margin: 32px; }  /* major sections */
```

### Animation Guidelines

#### Performance-First Animations
```css
/* Subtle, purposeful animations only */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 170, 0.15);
}

/* Loading states for search */
.search-loading {
  animation: pulse 1.5s ease-in-out infinite;
}

/* AVOID: Complex animations, parallax effects, excessive motion */
```

## Content Management Rules

### File Upload Security - CRITICAL
```typescript
// Virus scanning pipeline - MANDATORY
const secureFileUpload = async (file: File, authorId: string) => {
  // 1. File validation
  const allowedTypes = ['application/pdf', 'application/epub+zip']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  
  // 2. Size validation (max 50MB)
  if (file.size > 50 * 1024 * 1024) {
    throw new Error('File too large')
  }
  
  // 3. Quarantine upload to separate bucket
  const quarantineKey = `quarantine/${authorId}/${Date.now()}-${file.name}`
  await uploadToQuarantine(file, quarantineKey)
  
  // 4. Virus scan (implement with AWS GuardDuty or similar)
  const scanResult = await virusScan(quarantineKey)
  
  // 5. Move to production only if clean
  if (scanResult.clean) {
    return moveToProduction(quarantineKey, authorId)
  } else {
    await deleteQuarantineFile(quarantineKey)
    throw new Error('File failed security scan')
  }
}
```

### Metadata Extraction Rules
```typescript
// Automatic metadata extraction - IMPLEMENT FOR ALL UPLOADS
const extractEbookMetadata = async (filePath: string) => {
  const metadata = await extractPDFMetadata(filePath)
  
  return {
    title: metadata.title || 'Untitled',
    pageCount: metadata.pageCount,
    estimatedReadingTime: calculateReadingTime(metadata.pageCount),
    suggestedCategory: await categorizeContent(metadata.text),
    complexityRating: await assessComplexity(metadata.text),
    suggestedPrice: await suggestPricing(metadata),
    frameworks: extractFrameworkMentions(metadata.text),
    prerequisites: extractPrerequisites(metadata.text)
  }
}
```

## Performance Requirements

### Page Load Targets
```typescript
// Performance budgets - MUST ACHIEVE
const performanceTargets = {
  firstContentfulPaint: '1.5s',
  largestContentfulPaint: '2.5s',
  timeToInteractive: '3.0s',
  searchResultTime: '300ms',
  imageLoadTime: '1.0s'
}
```

### Caching Strategy - MANDATORY IMPLEMENTATION
```typescript
// Multi-layer caching approach
const cachingRules = {
  searchResults: '5 minutes',      // Redis cache
  categoryPages: '30 minutes',     // CDN + Redis
  authorProfiles: '1 hour',        // CDN + Redis
  ebookMetadata: '24 hours',       // CDN + Redis
  coverImages: '7 days',           // CDN aggressive
  staticAssets: '30 days'          // CDN maximum
}
```

## Security Boundaries - NON-NEGOTIABLE

### Authentication Rules
```typescript
// Session management - STRICT REQUIREMENTS
const sessionConfig = {
  strategy: 'jwt',
  maxAge: 7 * 24 * 60 * 60, // 7 days
  updateAge: 24 * 60 * 60,   // 1 day
  
  // REQUIRED: Secure cookie settings
  cookies: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}
```

### Data Protection Requirements
```typescript
// PII handling - MANDATORY COMPLIANCE
const dataProtectionRules = {
  // Never log PII
  allowedLogs: ['user_id', 'action_type', 'timestamp'],
  forbiddenLogs: ['email', 'name', 'payment_info'],
  
  // Data retention
  maxRetention: {
    userSessions: '30 days',
    searchLogs: '90 days', 
    errorLogs: '1 year'
  },
  
  // Encryption requirements
  encryptFields: ['email', 'payment_methods', 'personal_data']
}
```

## Code Quality Standards

### File Organization - ENFORCE STRICTLY
```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── stripe.ts         # Stripe setup
│   ├── supabase.ts       # Database client
│   └── search.ts         # Search utilities
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

### Naming Conventions - MANDATORY
```typescript
// Components: PascalCase
export function EbookCard() {}
export function AuthorProfile() {}

// Functions: camelCase with descriptive verbs
export async function createEbook() {}
export async function processPayment() {}
export async function searchContent() {}

// Constants: SCREAMING_SNAKE_CASE
export const PLATFORM_FEE = 25
export const MAX_FILE_SIZE = 50 * 1024 * 1024

// Database fields: snake_case
user_id, created_at, stripe_account_id
```

### Error Handling - COMPREHENSIVE COVERAGE
```typescript
// Error handling pattern - USE EVERYWHERE
try {
  const result = await riskyOperation()
  return { success: true, data: result }
} catch (error) {
  // Log error without PII
  console.error('Operation failed', { 
    operation: 'riskyOperation',
    timestamp: Date.now(),
    error: error.message 
  })
  
  // Return user-friendly error
  return { 
    success: false, 
    error: 'Unable to complete request. Please try again.' 
  }
}
```

## AI-Specific Development Rules

### Content Classification
```typescript
// AI content categorization - IMPLEMENT EXACTLY
const aiContentCategories = {
  'machine-learning': {
    subcategories: ['supervised', 'unsupervised', 'reinforcement'],
    frameworks: ['tensorflow', 'pytorch', 'scikit-learn', 'jax'],
    complexity: ['beginner', 'intermediate', 'advanced', 'research']
  },
  'natural-language-processing': {
    subcategories: ['transformers', 'llms', 'text-processing'],
    frameworks: ['huggingface', 'spacy', 'nltk', 'openai'],
    complexity: ['beginner', 'intermediate', 'advanced', 'research']
  },
  'computer-vision': {
    subcategories: ['object-detection', 'image-classification', 'segmentation'],
    frameworks: ['opencv', 'detectron2', 'yolo', 'mediapipe'],
    complexity: ['beginner', 'intermediate', 'advanced', 'research']
  }
  // Continue for all AI domains
}
```

### Semantic Search Implementation
```typescript
// Embedding generation - CONSISTENT APPROACH
const generateEmbedding = async (text: string) => {
  // Preprocess text for AI content
  const cleanText = preprocessAIContent(text)
  
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: cleanText,
    dimensions: 1536 // Consistent dimensionality
  })
  
  return response.data[0].embedding
}

// Content preprocessing for AI domain
const preprocessAIContent = (text: string) => {
  // Normalize AI terminology
  text = text.replace(/\bML\b/g, 'machine learning')
  text = text.replace(/\bNLP\b/g, 'natural language processing')
  text = text.replace(/\bCV\b/g, 'computer vision')
  // Add more normalization rules
  
  return text.toLowerCase().trim()
}
```

## Testing Requirements

### Test Coverage - MINIMUM STANDARDS
```typescript
// Required test types
const testRequirements = {
  unitTests: '80% coverage minimum',
  integrationTests: 'All API endpoints',
  e2eTests: 'Critical user journeys',
  
  criticalFlows: [
    'user registration and authentication',
    'ebook upload and processing',
    'search functionality',
    'payment processing',
    'content delivery'
  ]
}
```

### Test Examples - FOLLOW THESE PATTERNS
```typescript
// API route testing
describe('/api/ebooks', () => {
  it('should return ebooks with valid search query', async () => {
    const response = await request(app)
      .get('/api/ebooks?q=machine learning')
      .expect(200)
    
    expect(response.body).toHaveProperty('ebooks')
    expect(response.body.ebooks).toBeInstanceOf(Array)
  })
})

// Component testing
describe('SearchInput', () => {
  it('should debounce search queries', async () => {
    const mockSearch = jest.fn()
    render(<SearchInput onSearch={mockSearch} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test query')
    
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledTimes(1)
    }, { timeout: 500 })
  })
})
```

## Development Workflow

### Git Workflow - MANDATORY PROCESS
```bash
# Branch naming convention
feature/search-enhancement
fix/payment-processing-bug
hotfix/security-vulnerability

# Commit message format
feat: add semantic search for AI content
fix: resolve Stripe Connect onboarding issue
docs: update API documentation
test: add integration tests for search
```

### Code Review Checklist
```markdown
## Required Checks - ALL MUST PASS
- [ ] Follows naming conventions
- [ ] Implements proper error handling
- [ ] Includes appropriate tests
- [ ] Meets performance requirements
- [ ] Follows security guidelines
- [ ] Uses approved color palette
- [ ] Implements required caching
- [ ] Maintains type safety
- [ ] Documents complex logic
- [ ] Follows file organization rules
```

## Deployment Rules

### Environment Configuration
```typescript
// Required environment variables - NEVER DEPLOY WITHOUT
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'OPENAI_API_KEY',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY'
]
```

### Production Monitoring - IMPLEMENT ALL
```typescript
const monitoringRequirements = {
  performanceMetrics: [
    'response_time',
    'error_rate', 
    'search_latency',
    'payment_success_rate'
  ],
  businessMetrics: [
    'user_registrations',
    'ebook_uploads',
    'successful_purchases',
    'search_success_rate',
    'author_earnings'
  ],
  alerts: [
    'error_rate > 1%',
    'response_time > 2s',
    'payment_failure_rate > 0.5%',
    'search_latency > 500ms'
  ]
}
```

---

## Critical Reminders

1. **NEVER** change the $0.25 flat fee model
2. **ALWAYS** implement virus scanning for uploads
3. **MUST** use hybrid search (keyword + semantic)
4. **REQUIRED** to maintain color palette consistency
5. **ENFORCE** type safety throughout codebase
6. **IMPLEMENT** comprehensive error handling
7. **FOLLOW** performance budgets strictly
8. **MAINTAIN** security boundaries at all times

These rules ensure Mebooks.ai remains true to its mission while delivering a world-class platform for the AI community.