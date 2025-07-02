import { Ebook } from "@shared/schema";
import { redisClient } from "./redisClient";

export interface IStorage {
  searchEbooks(query: string): Promise<Ebook[]>;
  getAllEbooks(): Promise<Ebook[]>;
  getEbookById(id: string): Promise<Ebook | undefined>;
}

// Author lookup map (currently unused but available for future use)
// const authors: Record<number, string> = {
//   1: 'Dr. Sarah Chen',
//   2: 'Prof. Michael Rodriguez', 
//   3: 'Dr. Emma Thompson',
//   4: 'Dr. James Park',
//   5: 'Lisa Wang',
//   6: 'Dr. Robert Kim'
// };

// Mock ebooks data for development
const mockEbooks: Ebook[] = [
  {
    id: 1,
    title: 'Machine Learning Fundamentals',
    description: 'Complete guide to ML algorithms and applications. Learn the core concepts, mathematics, and practical implementation of machine learning techniques.',
    authorId: 1,
    price: '29.99',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Machine Learning',
    complexity: 'beginner',
    prerequisites: ['Basic Python', 'High School Math'],
    frameworkTags: ['Python', 'Scikit-learn', 'Pandas'],
    pageCount: 245,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Deep Learning with TensorFlow',
    description: 'Advanced neural networks and practical implementation. Master deep learning architectures and build production-ready models.',
    authorId: 2,
    price: '49.99',
    coverUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Deep Learning',
    complexity: 'advanced',
    prerequisites: ['Machine Learning Basics', 'Linear Algebra', 'Python'],
    frameworkTags: ['TensorFlow', 'Keras', 'Python'],
    pageCount: 387,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'Natural Language Processing Essentials',
    description: 'Text processing and language understanding with AI. From tokenization to transformer models, master NLP techniques.',
    authorId: 3,
    price: '39.99',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'NLP',
    complexity: 'intermediate',
    prerequisites: ['Python Programming', 'Basic ML'],
    frameworkTags: ['NLTK', 'spaCy', 'Transformers'],
    pageCount: 298,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'Computer Vision Applications',
    description: 'Image processing and recognition systems. Build computer vision applications from object detection to image generation.',
    authorId: 4,
    price: '44.99',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Computer Vision',
    complexity: 'advanced',
    prerequisites: ['Deep Learning', 'Linear Algebra', 'Python'],
    frameworkTags: ['OpenCV', 'PyTorch', 'PIL'],
    pageCount: 356,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: 'Data Science with Python',
    description: 'Complete data analysis and visualization guide. Master the full data science pipeline from collection to insights.',
    authorId: 5,
    price: '34.99',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Data Science',
    complexity: 'beginner',
    prerequisites: ['Basic Python', 'Statistics'],
    frameworkTags: ['Python', 'Matplotlib', 'Seaborn'],
    pageCount: 278,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    title: 'AI Ethics and Governance',
    description: 'Responsible AI development and deployment. Navigate the ethical challenges of AI systems in society.',
    authorId: 6,
    price: '24.99',
    coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'AI Ethics',
    complexity: 'intermediate',
    prerequisites: ['Basic AI Knowledge'],
    frameworkTags: ['Policy', 'Governance', 'Fairness'],
    pageCount: 189,
    fileUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class MemStorage implements IStorage {
  private ebooks: Ebook[];

  constructor() {
    this.ebooks = [...mockEbooks];
  }

  async searchEbooks(query: string): Promise<Ebook[]> {
    // Check cache first
    const cachedResults = await redisClient.getCachedSearchResults(query);
    if (cachedResults) {
      console.log('Storage: Using cached search results');
      return cachedResults;
    }

    // Perform search
    const searchTerms = query.toLowerCase().split(' ');
    const results = this.ebooks.filter(ebook => {
      const searchableText = `${ebook.title} ${ebook.description} ${ebook.category} ${ebook.frameworkTags?.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    // Cache the results
    await redisClient.cacheSearchResults(query, results);
    
    return results;
  }

  async getAllEbooks(): Promise<Ebook[]> {
    return [...this.ebooks];
  }

  async getEbookById(id: string): Promise<Ebook | undefined> {
    return this.ebooks.find(ebook => ebook.id.toString() === id);
  }
}

export const storage = new MemStorage();
